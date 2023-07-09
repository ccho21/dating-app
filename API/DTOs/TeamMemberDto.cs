using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class TeamMemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}