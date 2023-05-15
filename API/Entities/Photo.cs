using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public AppUser AppUser { get; set; }
        public int? AppUserId { get; set; }
        public Project Project { get; set; }
        public int? ProjectId { get; set; }
        public Experience Experience { get; set; }
        public int? ExperienceId { get; set; }
    }
}