using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
                .ForMember(dest => dest.ProjectNumber, opt => opt.MapFrom(src => src.Projects.Count()))
                .ForMember(dest => dest.FollowerNumber, opt => opt.MapFrom(src => src.LikedUsers.Count()))
                .ForMember(dest => dest.FollowingNumber, opt => opt.MapFrom(src => src.LikedByUsers.Count()));
            CreateMap<AppUser, MemberDetailDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
                .ForMember(dest => dest.ProjectNumber, opt => opt.MapFrom(src => src.Projects.Count()))
                .ForMember(dest => dest.FollowerNumber, opt => opt.MapFrom(src => src.LikedUsers.Count()))
                .ForMember(dest => dest.FollowingNumber, opt => opt.MapFrom(src => src.LikedByUsers.Count()));
            CreateMap<AppUser, UserDetailDto>()
               .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
               .ForMember(dest => dest.Likes, opt => opt.MapFrom(src => src.LikedByUsers.Count()))
               .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<AppUser, TeamMemberDto>()
               .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<AppUser, MemberMessageDto>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.RecentMessages, opt => opt.MapFrom(src => src.MessagesSent))
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Photo, PhotoDto>();
            CreateMap<PhotoDto, Photo>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<UserLike, LikeDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.SourceUser.Id))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.SourceUser.UserName))
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.SourceUser.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.SenderPhotoUrl,
                        opt => opt.MapFrom(src => src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl,
                        opt => opt.MapFrom(src => src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));


            CreateMap<Project, ProjectDto>()
                .ForMember(dest => dest.User,
                        opt => opt.MapFrom(src => src.AppUser));
            CreateMap<ProjectUpdateDto, Project>();

            CreateMap<Experience, ExperienceDto>()
                .ForMember(dest => dest.LogoUrl, opt => opt.MapFrom(src => src.Logos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<ExperienceUpdateDto, Experience>();

            CreateMap<JobDescription, JobDescriptionDto>();
            CreateMap<Skill, SkillDto>();

            CreateMap<JobDescriptionDto, JobDescription>();
            CreateMap<SkillDto, Skill>();

            CreateMap<AppUser, UserDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<ProjectUser, TeamMemberDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.AppUser.Id))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.AppUser.UserName))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.AppUser.Name))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.AppUser.City))
                .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.AppUser.Country))
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}