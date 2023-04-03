using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("JobDescriptions")]

    public class JobDescription
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Position { get; set; }
        public ICollection<JobDetail> Details { get; set; }
        public DateTime Started { get; set; }
        public DateTime? Ended { get; set; }
       public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; }
    }
}