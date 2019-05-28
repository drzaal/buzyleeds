using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace buzyleeds.dbo
{
    // Only use an enum if there are business rules associated with a status
    public enum TargetStatus { RESEARCHING, PENDING, APPROVED, DECLINED }

    public class TargetContext : DbContext
    {
        public DbSet<BusinessLead> BusinessLeads { get; set; }
        public DbSet<TargetContact> TargetContacts { get; set; }
        public DbSet<Financial> Financials { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(
            //    @"Server=(localdb)\mssqllocaldb;Database=busyleed;Integrated Security=True");
        }

        public TargetContext(DbContextOptions<TargetContext> options) : base(options) { }
    }

    public class BusinessLead
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public TargetStatus? Status { get; set; }

        [ForeignKey("LeadId")]
        public virtual IEnumerable<TargetContact> PrimaryContacts { get; set; }
        [ForeignKey("LeadId")]
        public virtual IEnumerable<Financial> FinancialData { get; set; }
    }

    public class TargetContact
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int LeadId { get; set; }
        public BusinessLead BusinessLead { get; set; }
        public string PersonalName { get; set; }
        public string FamilyName { get; set; }
        public string MiddleName { get; set; }
        public string Alias { get; set; }

        public string Phone { get; set; }
        public string Email { get; set; }

    }

    public class Financial
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int LeadId { get; set; }
        public BusinessLead BusinessLead { get; set; }
        public DateTime EventDate;
        public int CurrencyValue;
    }
}
