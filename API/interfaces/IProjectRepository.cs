using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.interfaces
{
    public interface IProjectRepository
    {
        Task<Project> GetProjectByIdAsync(int id);

        Task<PagedList<ProjectDto>> GetProjectsAsync(UserParams userParams);
    }
}