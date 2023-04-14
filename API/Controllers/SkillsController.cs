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
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class SkillsController : BaseApiController
    {
        // private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly DataContext _context;

        public SkillsController(IUnitOfWork unitOfWork, IMapper mapper, DataContext context)
        {

            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SkillDto>>> GetSkills()
        {
            var query = _context.Skills.AsQueryable();
            var skills = await query.ProjectTo<SkillDto>(_mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
            return Ok(skills);
        }


        [HttpPost]
        public async Task<ActionResult<SkillDto>> CreateSkill(SkillDto skillDto)
        {

            var existingSkill = await _context.Skills.SingleOrDefaultAsync(x => x.Name.Replace(" ", string.Empty).ToLower() == skillDto.Name.Replace(" ", string.Empty).ToLower());

            if (existingSkill != null)
            {
                return BadRequest("This skill is already added before");
            }

            var skill = new Skill
            {
                Name = skillDto.Name
            };

            _context.Skills.Add(skill);

            if (await _context.SaveChangesAsync() > 0) return Ok(_mapper.Map<SkillDto>(skill));

            return BadRequest("Failed to create skill");
        }
    }
}