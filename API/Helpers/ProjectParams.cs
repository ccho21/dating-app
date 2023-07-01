using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class ProjectParams : PaginationParams
    {
        public string CurrentUsername { get; set; }
        public string Username { get; set; }
        public string Title { get; set; }
        public string OrderBy { get; set; }
    }

}