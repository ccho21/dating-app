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
    public class ExperiencesController : BaseApiController
    {
        // private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        public ExperiencesController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExperienceDto>>> GetExperiences([FromQuery] ExperienceParams experienceParams)
        {

            var experiences = await _unitOfWork.ExperienceRepository.GetExperiencesAsync(experienceParams);

            Response.AddPaginationHeader(experiences.CurrentPage, experiences.PageSize, experiences.TotalCount, experiences.TotalPages);

            return Ok(experiences);
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<IEnumerable<MemberDto>>> getExperience(int id)
        // {
        //     var project = await _unitOfWork.ExperienceRepository.GetExperienceByIdAsync(id);

        //     return Ok(project);
        // }

        [HttpGet("{username}", Name = "GetExperiencesByUsername")]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetExperiencesByUsername(string username)
        {
            var experiences = await _unitOfWork.ExperienceRepository.GetExperiencesByUsernameAsync(username);

            Response.AddPaginationHeader(experiences.CurrentPage, experiences.PageSize, experiences.TotalCount, experiences.TotalPages);

            return Ok(experiences);
        }

        [HttpPost]
        public async Task<ActionResult<ExperienceDto>> CreateExperience(ExperienceDto createExperienceDto)
        {
            var username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            var experience = new Experience
            {
                Intro = createExperienceDto.Intro,
                Position = createExperienceDto.Position,
                CompanyName = createExperienceDto.CompanyName,
                Url = createExperienceDto.Url,
                Started = createExperienceDto.Started,
                Ended = createExperienceDto.Ended,
                AppUser = user,
                JobDescriptions = createExperienceDto.JobDescriptions.Select(x => new JobDescription
                {
                    Description = x.Description,
                    Position = x.Position,
                    Started = x.Started,
                    Ended = x.Ended,
                    Details = x.Details.Select(u => new JobDetail
                    {
                        Description = u.Description,

                    }).ToList()
                }).ToList()
            };

            _unitOfWork.ExperienceRepository.AddExperience(experience);

            if (await _unitOfWork.Complete()) return Ok(_mapper.Map<ExperienceDto>(experience));

            return BadRequest("Failed to send message");
        }

    }

}