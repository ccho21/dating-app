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
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            if (!string.IsNullOrEmpty(userParams.Gender))
            {
                // query = query.Where(u => u.Gender == userParams.Gender);
            }

            var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            // query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            //var users = query.Include(x => x.LikedByUsers).Select(u => new MemberDto
            //{
            //    Id = u.Id,
            //    Username = u.UserName,
            //    PhotoUrl = u.Photos.FirstOrDefault(p => p.IsMain).Url,
            //    Age = u.DateOfBirth.CalculateAge(),
            //    KnownAs = u.KnownAs,
            //    Created = u.Created,
            //    LastActive = u.LastActive,
            //    Gender = u.Gender,
            //    Introduction = u.Introduction,
            //    LookingFor = u.LookingFor,
            //    Interests = u.Interests,
            //    City = u.City,
            //    Country = u.Country,
            //    //Photos = u.Photos.,
            //    LikedByUsers = u.LikedByUsers.Select(u => new LikeDto
            //    {
            //        Username = u.SourceUser.UserName,
            //        KnownAs = u.SourceUser.KnownAs,
            //        Age = u.SourceUser.DateOfBirth.CalculateAge(),
            //        PhotoUrl = u.SourceUser.Photos.FirstOrDefault(p => p.IsMain).Url,
            //        City = u.SourceUser.City,
            //        Id = u.SourceUser.Id,
            //    }).ToList(),
            //}).AsQueryable();

            // query = query.Include(x => x.LikedByUsers).Select(u => new AppUser
            // {
            //     Id = u.Id,
            //     DateOfBirth = u.DateOfBirth,
            //     KnownAs = u.KnownAs,
            //     Created = u.Created,
            //     LastActive = u.LastActive,
            //     Gender = u.Gender,
            //     Introduction = u.Introduction,
            //     LookingFor = u.LookingFor,
            //     Interests = u.Interests,
            //     City = u.City,
            //     Country = u.Country,
            //     Photos = u.Photos,
            //     LikedByUsers = u.LikedByUsers,
            // }).AsQueryable();

            query = query.Include(x => x.LikedByUsers);
            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };

            return await PagedList<MemberDto>.CreateAsync(
                query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                userParams.PageNumber, userParams.PageSize);
        }

        public async Task<PagedList<MemberMessageDto>> GetMembersWithMessagesAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            if (!string.IsNullOrEmpty(userParams.Gender))
            {
                query = query.Where(u => u.Gender == userParams.Gender);
            }

            var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };

            query = query.Where(u => u.MessagesSent.Where(m => m.RecipientUsername == userParams.CurrentUsername).Count() > 0);

            return await PagedList<MemberMessageDto>.CreateAsync(
                query.ProjectTo<MemberMessageDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                userParams.PageNumber, userParams.PageSize);
        }


        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<string> GetUserGender(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .Select(x => x.Gender).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.Include(p => p.Photos).ToListAsync();
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}