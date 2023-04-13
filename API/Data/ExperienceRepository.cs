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

        public ExperienceRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddExperience(Experience experience)
        {
            _context.Experiences.Add(experience);
        }

        public void UpdateExperience(Experience experience)
        {
            _context.Experiences.Update(experience);
        }

        public void DeleteExperience(Experience experience)
        {
            _context.Experiences.Remove(experience);
        }

        public async Task<PagedList<ExperienceDto>> GetExperiencesAsync(ExperienceParams experienceParams)
        {
            var query = _context.Experiences.Include(x => x.AppUser).AsQueryable();

            // Check if the keyword is for username or project name
            if (!string.IsNullOrEmpty(experienceParams.CurrentUsername))
            {
                query = query.Where(x => x.AppUser.UserName.ToLower().Contains(experienceParams.CurrentUsername.ToLower()));
            }

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

        public async Task<ExperienceDto> GetExperienceAsync(int id)
        {
            return await _context.Experiences
                .Where(x => x.Id == id)
                .ProjectTo<ExperienceDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }
        public async Task<Experience> GetExperienceWithLogoByIdAsync(int id)
        {
            return await _context.Experiences.Include(x => x.Logo).SingleOrDefaultAsync(x => x.Id == id);
        }
        public async Task<Experience> GetExperienceWithDetailsByIdAsync(int id)
        {
            return await _context.Experiences.Include(x => x.JobDescriptions).ThenInclude(x => x.Details).SingleOrDefaultAsync(x => x.Id == id);
        }

    }
}