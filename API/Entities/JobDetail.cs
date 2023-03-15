using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("JobDetails")]
    public class JobDetail
    {
        public int Id { get; set; }
        public string Description { get; set; }
    }
}