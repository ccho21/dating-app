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
        void AddProject(Project project);
        void UpdateProject(Project project);
        void DeleteProject(Project project);
        public Task<PagedList<ProjectDto>> GetProjectsAsync(ProjectParams projectParams);
        public Task<ProjectDto> GetProjectAsync(int id);
        public Task<Project> GetProjectByIdAsync(int id);
        public Task<Project> GetProjectWithImagesByIdAsync(int id);
    }
}