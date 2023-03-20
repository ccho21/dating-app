using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class ProjectsController : BaseApiController
    {
        //private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        public ProjectsController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects([FromQuery] ProjectParams projectParams)
        {

            var projects = await _unitOfWork.ProjectRepository.GetProjectsAsync(projectParams);

            Response.AddPaginationHeader(projects.CurrentPage, projects.PageSize, projects.TotalCount, projects.TotalPages);

            return Ok(projects);
        }

        [HttpGet("{username}", Name = "GetProjectsByUsername")]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjectsByUsername(string username)
        {
            var projects = await _unitOfWork.ProjectRepository.GetProjectsByUsernameAsync(username);

            Response.AddPaginationHeader(projects.CurrentPage, projects.PageSize, projects.TotalCount, projects.TotalPages);

            return Ok(projects);
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDto>> CreateProject(ProjectDto createProjectDto)
        {
            var username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            var project = new Project
            {
                Intro = createProjectDto.Intro,
                Name = createProjectDto.Name,
                ProjectWith = createProjectDto.ProjectWith,
                Description = createProjectDto.Description,
                MainFeature = createProjectDto.MainFeature,
                Url = createProjectDto.Url,
                GithubUrl = createProjectDto.GithubUrl,
                FrontEnd = createProjectDto.FrontEnd,
                BackEnd = createProjectDto.BackEnd,
                Database = createProjectDto.Database,
                Deployement = createProjectDto.Deployement,
                ProjectStarted = createProjectDto.ProjectStarted,
                ProjectEnded = createProjectDto.ProjectEnded,
                AppUser = user,
            };

            _unitOfWork.ProjectRepository.AddProject(project);

            if (await _unitOfWork.Complete()) return Ok(_mapper.Map<ProjectDto>(project));

            return BadRequest("Failed to send message");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectDto>> UpdateProject(int id, ProjectDto updateProjectDto)
        {
            var project = await _unitOfWork.ProjectRepository.GetProjectByIdAsync(id);

            if (project == null)
                return BadRequest("This is already your main photo");

            project = _mapper.Map<Project>(updateProjectDto);

            _unitOfWork.ProjectRepository.UpdateProject(project);

            if (await _unitOfWork.Complete()) return Ok(_mapper.Map<ProjectDto>(project));

            return BadRequest("Failed to update project");
        }


        [HttpPost("{id}/add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(int id, IFormFile file)
        {
            var project = await _unitOfWork.ProjectRepository.GetProjectByIdAsync(id);
            var username = User.GetUsername();

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (project.Images.Count == 0)
            {
                photo.IsMain = true;
            }

            project.Images.Add(photo);

            if (await _unitOfWork.Complete())
            {
                // return CreatedAtRoute("GetUser", _mapper.Map<PhotoDto>(photo));
                return CreatedAtRoute("GetProjectsByUsername", new { username = username }, _mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("Problem adding photo");
        }


        [HttpPut("{id}/set-main-photo/{photoId}")]
        public async Task<ActionResult<PhotoDto>> SetMainPhoto(int id, int photoId)
        {
            var project = await _unitOfWork.ProjectRepository.GetProjectByIdAsync(id);

            var photo = project.Images.FirstOrDefault(x => x.Id == photoId);

            if (photo.IsMain) return BadRequest("This is already your main photo");

            var currentMain = project.Images.FirstOrDefault(x => x.IsMain);

            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to set main photo");
        }

        [HttpDelete("{id}/delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int id, int photoId)
        {
            var project = await _unitOfWork.ProjectRepository.GetProjectByIdAsync(id);

            var photo = project.Images.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("You cannot delete your main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            project.Images.Remove(photo);
            if (await _unitOfWork.Complete()) return Ok();
            return BadRequest("Failed to delete the photo");

        }
    }

}