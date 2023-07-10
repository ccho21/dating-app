using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager, DataContext context)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            var projectData = await System.IO.File.ReadAllTextAsync("Data/ProjectSeedData.json");
            var projects = JsonSerializer.Deserialize<List<Project>>(projectData);

            if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                user.Created = DateTime.SpecifyKind(user.Created, DateTimeKind.Utc);
                user.LastActive = DateTime.SpecifyKind(user.LastActive, DateTimeKind.Utc);
                user.Projects = user.Projects;
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                if (projects == null) return;

                foreach (var project in projects)
                {
                    if (project.AppUserId == user.Id)
                    {
                        var p = new Project
                        {
                            Name = project.Name,
                            ProjectWith = project.ProjectWith,
                            Description = project.Description,
                            MainFeature = project.MainFeature,
                            Url = project.Url,
                            GithubUrl = project.Name,
                            FrontEnd = project.FrontEnd,
                            BackEnd = project.BackEnd,
                            Deployement = project.Deployement,
                            Progress = project.Progress,
                            Status = project.Status,
                            Images = project.Images,
                            AppUser = user
                        };
                        await context.Projects.AddAsync(p);
                    }
                }
                await context.SaveChangesAsync();
            }

            var admin = new AppUser
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });



           

        }
    }
}