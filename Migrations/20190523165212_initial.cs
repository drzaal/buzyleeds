using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace buzyleeds.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BusinessLeads",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessLeads", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Financials",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    BusinessLeadId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Financials", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Financials_BusinessLeads_BusinessLeadId",
                        column: x => x.BusinessLeadId,
                        principalTable: "BusinessLeads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TargetContacts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PersonalName = table.Column<string>(nullable: true),
                    FamilyName = table.Column<string>(nullable: true),
                    MiddleName = table.Column<string>(nullable: true),
                    Alias = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    BusinessLeadId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TargetContacts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TargetContacts_BusinessLeads_BusinessLeadId",
                        column: x => x.BusinessLeadId,
                        principalTable: "BusinessLeads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Financials_BusinessLeadId",
                table: "Financials",
                column: "BusinessLeadId");

            migrationBuilder.CreateIndex(
                name: "IX_TargetContacts_BusinessLeadId",
                table: "TargetContacts",
                column: "BusinessLeadId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Financials");

            migrationBuilder.DropTable(
                name: "TargetContacts");

            migrationBuilder.DropTable(
                name: "BusinessLeads");
        }
    }
}
