using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public ICollection<Photo> Photos { get; set; }

    }
}