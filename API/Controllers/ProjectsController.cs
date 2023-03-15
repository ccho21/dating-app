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

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<MemberDto>>> getProjectbyId(int id)
        {
            var projects = await _unitOfWork.ProjectRepository.GetProjectByIdAsync(id);

            return Ok(projects);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects([FromQuery] UserParams userParams)
        {

            var users = await _unitOfWork.ProjectRepository.GetProjectsAsync(userParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(users);
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDto>> CreateProject(ProjectDto createProjectDto)
        {
            var username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);


            var project = new Project
            {
                Intro = createProjectDto.Intro,
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

    }

    // [HttpPut]
    // public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    // {

    //     var username = User.GetUsername();
    //     var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

    //     _mapper.Map(memberUpdateDto, user);

    //     _unitOfWork.UserRepository.Update(user);

    //     if (await _unitOfWork.Complete()) return NoContent();

    //     return BadRequest("Failed to update user");
    // }
}