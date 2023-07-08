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
            // If the query contains username, filter the output based on the query.
            if (!string.IsNullOrEmpty(userParams.Username))
            {
                query = query.Where(x => x.UserName.ToLower().Contains(userParams.Username.ToLower()));
            }


            //if (!string.IsNullOrEmpty(userParams.Position))
            //{
            //    query = query.Where(x => x.UserName == userParams.Position);
            //}

            //if (!string.IsNullOrEmpty(userParams.School))
            //{
            //    query = query.Where(x => x.UserName == userParams.Username);
            //}

            query = query.Include(x => x.LikedUsers);
            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                "username" => query.OrderBy(u => u.UserName),
                _ => query.OrderByDescending(u => u.LastActive)
            };

            return await PagedList<MemberDto>.CreateAsync(
                query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                userParams.PageNumber, userParams.PageSize);
        }

        public async Task<PagedList<MemberMessageDto>> GetMembersWithMessagesAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();
            query = query.Where(u => u.UserName != userParams.CurrentUsername).Include(u => u.MessagesSent).Include(u => u.MessagesReceived);

            query = query.Select(u => new AppUser
            {
                Id = u.Id,
                UserName = u.UserName,
                KnownAs = u.KnownAs,
                LastActive = u.LastActive,
                Photos = u.Photos,
                MessagesSent = u.MessagesSent.Where(m => m.RecipientUsername == userParams.CurrentUsername).OrderBy(m => m.MessageSent).ToList(),
                MessagesReceived = u.MessagesReceived.Where(m => m.SenderUsername == userParams.CurrentUsername).OrderBy(m => m.MessageSent).ToList()
            }).Where(u => u.MessagesReceived.Count > 0 || u.MessagesSent.Count > 0);

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };

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