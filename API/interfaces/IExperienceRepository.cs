using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.interfaces
{
    public interface IExperienceRepository
    {
        void AddExperience(Experience experience);
        public Task<PagedList<ExperienceDto>> GetExperiencesAsync(ExperienceParams experienceParams);
        public Task<Experience> GetExperienceByIdAsync(int id);
    }
}