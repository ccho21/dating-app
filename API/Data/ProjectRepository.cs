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


        public ProjectRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<PagedList<ProjectDto>> GetProjectsAsync(ProjectParams projectParams)
        {
            var query = _context.Projects.AsQueryable();

            return await PagedList<ProjectDto>.CreateAsync(
                query.ProjectTo<ProjectDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                projectParams.PageNumber, projectParams.PageSize);
        }
        public async Task<Project> GetProjectByIdAsync(int id)
        {
            return await _context.Projects.FindAsync(id);
        }

    }
}