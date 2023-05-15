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
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        public ProjectsController(DataContext context, IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects([FromQuery] ProjectParams projectParams)
        {

            var projects = await _unitOfWork.ProjectRepository.GetProjectsAsync(projectParams);

            Response.AddPaginationHeader(projects.CurrentPage, projects.PageSize, projects.TotalCount, projects.TotalPages);

            return Ok(projects);
        }


        [HttpGet("{id}", Name = "getProject")]
        public async Task<ActionResult<ProjectDto>> GetProject(int id)
        {
            return await _unitOfWork.ProjectRepository.GetProjectAsync(id);
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
        public async Task<ActionResult<ProjectDto>> UpdateProject(int id, ProjectUpdateDto updateProjectDto)
        {
            var username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            var project = await _unitOfWork.ProjectRepository.GetProjectByIdAsync(id);

            if (project == null)
                return BadRequest("Project not found");

            if (user.Id != project.AppUserId)
                return BadRequest("You don't have permission to update this project");

            _mapper.Map(updateProjectDto, project);

            if (await _context.SaveChangesAsync() >= 0)
                return Ok(_mapper.Map<ProjectDto>(project));

            return BadRequest("Failed to update project");
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            var project = await _unitOfWork.ProjectRepository.GetProjectWithImagesByIdAsync(id);

            if (project == null) return NotFound();

            _unitOfWork.ProjectRepository.DeleteProject(project);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to delete the project");

        }


        [HttpPost("{id}/add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(int id, IFormFile file)
        {
            var project = await _unitOfWork.ProjectRepository.GetProjectWithImagesByIdAsync(id);

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
                return CreatedAtRoute("GetProject", new { id = project.Id }, _mapper.Map<PhotoDto>(photo));
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
            var project = await _unitOfWork.ProjectRepository.GetProjectWithImagesByIdAsync(id);

            var photo = project.Images.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            // if (photo.IsMain) return BadRequest("You cannot delete your main photo");

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