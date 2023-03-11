using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}