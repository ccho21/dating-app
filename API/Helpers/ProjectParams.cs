using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class ProjectParams : PaginationParams
    {
        public string CurrentUsername { get; set; }
        public string Keyword { get; set; }
        public string OrderBy { get; set; } = "lastActive";
    }

}