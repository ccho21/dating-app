using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Education
    {
        public int Id { get; set; }
        public string SchoolName { get; set; }
        public string Program { get; set; }
        public string Degree { get; set; }
        public string Description { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}