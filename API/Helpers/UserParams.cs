using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class UserParams : PaginationParams
    {


        public string CurrentUsername { get; set; }
        public string Username { get; set; }
        public string School { get; set; }
        public string Position { get; set; }
        public string OrderBy { get; set; } = "lastActive";
    }

}