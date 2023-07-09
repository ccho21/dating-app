using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ProjectLike
    {
        public int Id { get; set; }
        public AppUser SourceUser { get; set; }
        public int SourceUserId { get; set; }
        public Project LikedProject { get; set; }
        public int LikedProjectId { get; set; }
    }
}