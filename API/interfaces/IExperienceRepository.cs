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
        void UpdateExperience(Experience experience);
        public void DeleteExperience(Experience experience);
        public Task<PagedList<ExperienceDto>> GetExperiencesAsync(ExperienceParams experienceParams);
        public Task<PagedList<ExperienceDto>> GetExperiencesByUsernameAsync(string username);
        public Task<ExperienceDto> GetExperienceAsync(int id);
        public Task<Experience> GetExperienceWithLogoByIdAsync(int id);
        public Task<Experience> GetExperienceWithDetailsByIdAsync(int id);
    }
}