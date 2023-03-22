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
    public class ProjectRepository : IProjectRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public void AddProject(Project project)
        {
            _context.Projects.Add(project);
        }

        public void UpdateProject(Project project)
        {
            _context.Projects.Update(project);
        }


        public ProjectRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<PagedList<ProjectDto>> GetProjectsAsync(ProjectParams projectParams)
        {
            var query = _context.Projects.Include(x => x.Images).AsQueryable();
            if (!string.IsNullOrEmpty(projectParams.CurrentUsername))
            {
                query = query.Where(x => x.AppUser.UserName == projectParams.CurrentUsername);
            }

            return await PagedList<ProjectDto>.CreateAsync(
                query.ProjectTo<ProjectDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                projectParams.PageNumber, projectParams.PageSize);
        }
        public async Task<PagedList<ProjectDto>> GetProjectsByUsernameAsync(string username)
        {
            var query = _context.Projects.AsQueryable();
            query = query.Where(x => x.AppUser.UserName == username);

            return await PagedList<ProjectDto>.CreateAsync(
                query.ProjectTo<ProjectDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                1, 10);
        }
        public async Task<Project> GetProjectByIdAsync(int id)
        {
            return await _context.Projects.FirstOrDefaultAsync(x => x.Id == id);
        }

    }
}