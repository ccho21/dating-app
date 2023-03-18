using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ExperienceDto
    {

        public int Id { get; set; }
        public string Intro { get; set; }
        public string Position { get; set; }
        public string CompanyName { get; set; }
        public ICollection<JobDescriptionDto> JobDescriptions { get; set; }
        public string Url { get; set; }
        public int AppUserId { get; set; }
        public DateTime Started { get; set; }
        public DateTime? Ended { get; set; }
        public PhotoDto Logo { get; set; }

    }
}