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
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<AppUser, UserDetailDto>()
           .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
           .ForMember(dest => dest.Likes, opt => opt.MapFrom(src => src.LikedByUsers.Count()))
           .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<AppUser, MemberMessageDto>()
            .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.UserName))
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
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
            CreateMap<Experience, ExperienceDto>();
            CreateMap<ExperienceUpdateDto, Experience>();

            CreateMap<JobDescription, JobDescriptionDto>();
            CreateMap<Skill, SkillDto>();

            CreateMap<JobDescriptionDto, JobDescription>();
            CreateMap<SkillDto, Skill>();
        }
    }
}