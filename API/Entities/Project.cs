using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Status { get; set; }
        public int Progress { get; set; }
        public bool IsPublic { get; set; }
        public string Intro { get; set; }
        public string ProjectWith { get; set; }
        public string Description { get; set; }
        public string MainFeature { get; set; }
        public string Url { get; set; }
        public string GithubUrl { get; set; }
        public string FrontEnd { get; set; }
        public string BackEnd { get; set; }
        public string Database { get; set; }
        public string Deployement { get; set; }
        public DateTime? ProjectStarted { get; set; }
        public DateTime? ProjectEnded { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public ICollection<Photo> Images { get; set; }
        public ICollection<ProjectUser> TeamMembers { get; set; }
        public ICollection<ProjectLike> Likes { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; }
        public ICollection<Skill> Skills { get; set; }
    }
}