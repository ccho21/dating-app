using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class LikedDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int Age { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public string City { get; set; }
    }
}