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

        public void DeleteProject(Project project)
        {
            _context.Projects.Remove(project);
        }


        public ProjectRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<PagedList<ProjectDto>> GetProjectsAsync(ProjectParams projectParams)
        {
            var query = _context.Projects.Include(x => x.AppUser).Include(x => x.Images).AsQueryable();
            // Filter with current username
            if (!string.IsNullOrEmpty(projectParams.CurrentUsername))
            {
                query = query.Where(x => x.AppUser.UserName == projectParams.CurrentUsername);
            }

            // Check if the keyword is for username or project name
            if (!string.IsNullOrEmpty(projectParams.Username))
            {
                query = query.Where(x => x.AppUser.UserName.ToLower().Contains(projectParams.Title.ToLower()));
            }

            // Check if the keyword is for username or project name
            if (!string.IsNullOrEmpty(projectParams.Title))
            {
                query = query.Where(x => x.Name.ToLower().Contains(projectParams.Title.ToLower()));
            }

            if (!string.IsNullOrEmpty(projectParams.OrderBy))
            {
                var param = projectParams.OrderBy.Trim().ToLower();
                switch (param)
                {
                    case "projectDate":
                        query = query.OrderBy(x => x.ProjectStarted);
                        break;
                    case "title":
                        query = query.OrderBy(x => x.Name);
                        break;
                    case "username":
                        query = query.OrderBy(x => x.AppUser.UserName);
                        break;
                    default:
                        break;
                }
            }

            return await PagedList<ProjectDto>.CreateAsync(
                query.ProjectTo<ProjectDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                projectParams.PageNumber, projectParams.PageSize);
        }

        public async Task<ProjectDto> GetProjectAsync(int id)
        {
            return await _context.Projects
                .Where(x => x.Id == id)
                .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
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

        public async Task<Project> GetProjectWithImagesByIdAsync(int id)
        {
            return await _context.Projects.Include(x => x.Images).FirstOrDefaultAsync(x => x.Id == id);
        }

    }
}