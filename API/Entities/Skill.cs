using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Skills")]

    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Category { get; set; }
        public AppUser AppUser { get; set; }
        public int? AppUserId { get; set; }
        public Project Project { get; set; }
        public int? ProjectId { get; set; }
        public Experience Experience { get; set; }
        public int? ExperienceId { get; set; }
    }
}