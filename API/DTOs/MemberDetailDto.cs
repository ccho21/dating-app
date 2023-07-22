using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberDetailDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public int Age { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public string Job { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Company { get; set; }
        public string Website { get; set; }
        public string LinkedIn { get; set; }
        public string Github { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string Instagram { get; set; }

        public int ProjectNumber { get; set; }
        public int FollowerNumber { get; set; }
        public int FollowingNumber { get; set; }
        public ICollection<LikeDto> LikedByUsers { get; set; }
        // public ICollection<ProjectDto> Projects { get; set; }
        // public ICollection<ExperienceDto> Experiences { get; set; }
    }
}