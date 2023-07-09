using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberMessageDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public string Name { get; set; }
        public DateTime LastActive { get; set; }
        public ICollection<MessageDto> RecentMessages { get; set; }
    }
}