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
            using var transaction = await context.Database.BeginTransactionAsync();

            try
            {
                // Perform database operations here

                if (await userManager.Users.AnyAsync()) return;

                var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
                var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

                var projectData = await System.IO.File.ReadAllTextAsync("Data/ProjectSeedData.json");
                var projects = JsonSerializer.Deserialize<List<Project>>(projectData);

                var experienceData = await System.IO.File.ReadAllTextAsync("Data/ExperienceSeedData.json");
                var experiences = JsonSerializer.Deserialize<List<Experience>>(experienceData);

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
                }

                var admin = new AppUser
                {
                    UserName = "admin"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });


                await context.SaveChangesAsync();

                if (projects == null) return;

                var updatedProjects = new List<Project>();
                foreach (var project in projects)
                {
                    var u = await context.Users.FindAsync(project.AppUserId);

                    if (project.AppUserId == u.Id)
                    {
                        var p = new Project
                        {
                            Name = project.Name,
                            ProjectWith = project.ProjectWith,
                            Description = project.Description,
                            MainFeature = project.MainFeature,
                            Url = project.Url,
                            IsPublic = project.IsPublic,
                            IsCurrent  =   project.IsCurrent,
                            ProjectStarted = project.ProjectStarted,
                            ProjectEnded = project.ProjectEnded,
                            GithubUrl = project.Name,
                            FrontEnd = project.FrontEnd,
                            BackEnd = project.BackEnd,
                            Deployement = project.Deployement,
                            Progress = project.Progress,
                            Status = project.Status,
                            Images = project.Images,
                            AppUser = u,
                        };
                        await context.Projects.AddAsync(p);

                        p.TeamMembers = project.TeamMembers;
                        updatedProjects.Add(p);
                    }
                }

                await context.SaveChangesAsync();

                foreach (var project in updatedProjects)
                {
                    foreach (var member in project.TeamMembers)
                    {
                        var user = await context.Users.FindAsync(member.AppUserId);

                        if (user.Id == project.AppUserId)
                        {
                            var projectUser = new ProjectUser
                            {
                                AppUser = user,
                                ProjectId = project.Id,
                            };
                            await context.ProjectUsers.AddAsync(projectUser);
                        }
                    }
                }


                foreach (var experience in experiences)
                {
                    var u = await context.Users.FindAsync(experience.AppUserId);

                    if (experience.AppUserId == u.Id)
                    {
                        var e = new Experience
                        {
                            Position = experience.Position,
                            CompanyName = experience.CompanyName,
                            Url = experience.Url,
                            Started = experience.Started,
                            JobDescriptions = experience.JobDescriptions,
                            AppUser = u,
                        };
                        await context.Experiences.AddAsync(e);
                    }
                }

                await context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();

                // Reset identity column
                await context.Database.ExecuteSqlRawAsync("DBCC CHECKIDENT ('MyTable', RESEED, 0)");

                throw;
            }
        }
    }
}