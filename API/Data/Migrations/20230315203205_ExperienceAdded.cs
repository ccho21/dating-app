using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class ExperienceAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "Photos",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Educations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SchoolName = table.Column<string>(type: "TEXT", nullable: true),
                    Program = table.Column<string>(type: "TEXT", nullable: true),
                    Degree = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    AppUserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Educations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Educations_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Experiences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Intro = table.Column<string>(type: "TEXT", nullable: true),
                    Position = table.Column<string>(type: "TEXT", nullable: true),
                    CompanyName = table.Column<string>(type: "TEXT", nullable: true),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    Started = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Ended = table.Column<DateTime>(type: "TEXT", nullable: true),
                    AppUserId = table.Column<int>(type: "INTEGER", nullable: false),
                    LogoId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Experiences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Experiences_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Experiences_Photos_LogoId",
                        column: x => x.LogoId,
                        principalTable: "Photos",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Intro = table.Column<string>(type: "TEXT", nullable: true),
                    ProjectWith = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    MainFeature = table.Column<string>(type: "TEXT", nullable: true),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    GithubUrl = table.Column<string>(type: "TEXT", nullable: true),
                    FrontEnd = table.Column<string>(type: "TEXT", nullable: true),
                    BackEnd = table.Column<string>(type: "TEXT", nullable: true),
                    Database = table.Column<string>(type: "TEXT", nullable: true),
                    Deployement = table.Column<string>(type: "TEXT", nullable: true),
                    ProjectStarted = table.Column<DateTime>(type: "TEXT", nullable: true),
                    ProjectEnded = table.Column<DateTime>(type: "TEXT", nullable: true),
                    AppUserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projects_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobDescriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Position = table.Column<string>(type: "TEXT", nullable: true),
                    Started = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Ended = table.Column<DateTime>(type: "TEXT", nullable: true),
                    ExperienceId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobDescriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobDescriptions_Experiences_ExperienceId",
                        column: x => x.ExperienceId,
                        principalTable: "Experiences",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "JobDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    JobDescriptionId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobDetails_JobDescriptions_JobDescriptionId",
                        column: x => x.JobDescriptionId,
                        principalTable: "JobDescriptions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_ProjectId",
                table: "Photos",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Educations_AppUserId",
                table: "Educations",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Experiences_AppUserId",
                table: "Experiences",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Experiences_LogoId",
                table: "Experiences",
                column: "LogoId");

            migrationBuilder.CreateIndex(
                name: "IX_JobDescriptions_ExperienceId",
                table: "JobDescriptions",
                column: "ExperienceId");

            migrationBuilder.CreateIndex(
                name: "IX_JobDetails_JobDescriptionId",
                table: "JobDetails",
                column: "JobDescriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_AppUserId",
                table: "Projects",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Projects_ProjectId",
                table: "Photos",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Projects_ProjectId",
                table: "Photos");

            migrationBuilder.DropTable(
                name: "Educations");

            migrationBuilder.DropTable(
                name: "JobDetails");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "JobDescriptions");

            migrationBuilder.DropTable(
                name: "Experiences");

            migrationBuilder.DropIndex(
                name: "IX_Photos_ProjectId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Photos");
        }
    }
}
