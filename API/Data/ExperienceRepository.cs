using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ExperienceRepository : IExperienceRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public void AddExperience(Experience experience)
        {
            _context.Experiences.Add(experience);
        }

        public ExperienceRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<PagedList<ExperienceDto>> GetExperiencesAsync(ExperienceParams experienceParams)
        {
            var query = _context.Experiences.AsQueryable();

            return await PagedList<ExperienceDto>.CreateAsync(
                query.ProjectTo<ExperienceDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                experienceParams.PageNumber, experienceParams.PageSize);
        }

        public async Task<PagedList<ExperienceDto>> GetExperiencesByUsernameAsync(string username)
        {
            var query = _context.Experiences.AsQueryable();
            query = query.Where(x => x.AppUser.UserName == username);

            return await PagedList<ExperienceDto>.CreateAsync(
               query.ProjectTo<ExperienceDto>(_mapper.ConfigurationProvider).AsNoTracking(),
               1, 10);
        }

        public async Task<Experience> GetExperienceByIdAsync(int id)
        {
            return await _context.Experiences.FindAsync(id);
        }

    }
}