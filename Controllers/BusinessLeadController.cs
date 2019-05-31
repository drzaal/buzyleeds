using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using buzyleeds.dbo;
using Microsoft.EntityFrameworkCore;

namespace buzyleeds.Controllers
{


    [Route("api/[controller]")]
    public class BusinessLeadController : Controller
    {
        private TargetContext db;

        public BusinessLeadController(TargetContext context)
        {
            db = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<BusinessLead> GetAll()
        {
            var response = db.BusinessLeads.Include(x => x.PrimaryContacts)
                .ToList();
            HttpContext.Response.Headers["Transfer-Encoding"] = "identity";
            return response;
        }

        [HttpGet("[action]")]
        public int TotalCount()
        {
            return db.BusinessLeads.Count();
        }

        [HttpGet("[action]")]
        public BusinessLead GetById(int id)
        {
            return db.BusinessLeads.Find(id);
        }

        [HttpDelete("[action]/{id}")]
        public void DeleteRecord(int id)
        {
            db.BusinessLeads.Remove(db.BusinessLeads.Find(id));
            db.SaveChanges();
        }

        [HttpPost("[action]")]
        public BusinessLead SaveRecord([FromBody] BusinessLead leadData)
        {
            try
            {
                if (leadData.Id == 0) leadData = db.BusinessLeads.Add(leadData).Entity;
                else db.BusinessLeads.Update(leadData);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return leadData;
        }
    }
}
