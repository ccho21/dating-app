using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }
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
        public ICollection<PhotoDto> Images { get; set; }
    }
}