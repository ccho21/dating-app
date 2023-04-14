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

        [HttpGet("{id}", Name = "getExperience")]
        public async Task<ActionResult<ExperienceDto>> getExperience(int id)
        {
            return await _unitOfWork.ExperienceRepository.GetExperienceAsync(id);
        }

        //[HttpGet("{username}", Name = "GetExperiencesByUsername")]
        //public async Task<ActionResult<IEnumerable<ExperienceDto>>> GetExperiencesByUsername(string username)
        //{
        //    var experiences = await _unitOfWork.ExperienceRepository.GetExperiencesByUsernameAsync(username);

        //    Response.AddPaginationHeader(experiences.CurrentPage, experiences.PageSize, experiences.TotalCount, experiences.TotalPages);

        //    return Ok(experiences);
        //}

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
                    Details = x.Details,
                    Skills = x.Skills.Select(u => new Skill
                    {
                        Name = u.Name,

                    }).ToList()
                }).ToList()
            };

            _unitOfWork.ExperienceRepository.AddExperience(experience);

            if (await _unitOfWork.Complete()) return Ok(_mapper.Map<ExperienceDto>(experience));

            return BadRequest("Failed to send message");
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<ExperienceDto>> UpdateExperience(int id, ExperienceUpdateDto createExperienceDto)
        {
            var username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            var experience = await _unitOfWork.ExperienceRepository.GetExperienceAsync(id);

            if (experience == null)
                return BadRequest("Experience not found");

            if (user.Id != experience.AppUserId)
                return BadRequest("You don't have permission to update this experience");

            _mapper.Map(createExperienceDto, experience);

            if (await _unitOfWork.Complete())
                return Ok(_mapper.Map<ExperienceDto>(experience));

            return BadRequest("Failed to update experience");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteExperience(int id)
        {
            var experience = await _unitOfWork.ExperienceRepository.GetExperienceWithDetailsByIdAsync(id);

            if (experience == null) return NotFound();

            _unitOfWork.ExperienceRepository.DeleteExperience(experience);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to delete the experience");

        }

        [HttpPost("{id}/add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(int id, IFormFile file)
        {
            var experience = await _unitOfWork.ExperienceRepository.GetExperienceWithLogoByIdAsync(id);
            var username = User.GetUsername();

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            experience.Logo = photo;

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetExperiencesByUsername", new { username = username }, _mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("Problem adding photo");
        }

        [HttpDelete("{id}/delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int id, int photoId)
        {
            var experience = await _unitOfWork.ExperienceRepository.GetExperienceWithLogoByIdAsync(id);

            var logo = experience.Logo;

            if (logo == null) return NotFound();

            if (logo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(logo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }
            experience.Logo = null;

            if (await _unitOfWork.Complete()) return Ok();
            return BadRequest("Failed to delete the Logo");

        }

    }
}