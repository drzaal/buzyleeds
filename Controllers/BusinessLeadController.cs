using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using nixiang.dbo;

namespace nixiang.Controllers
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
        public IEnumerable<BusinessLead> LeadList()
        {
            return db.BusinessLeads.ToList();
        }

        [HttpGet("[action]")]
        public BusinessLead LeadDetail(int id)
        {
            return db.BusinessLeads.Find(id);
        }

        [HttpDelete("[action]")]
        public void Delete(int id)
        {
            db.BusinessLeads.Remove(db.BusinessLeads.Find(id));
            db.SaveChanges();
        }

        [HttpPut("[action]")]
        public BusinessLead Create(BusinessLead leadData)
        {
            var leadRecord = db.BusinessLeads.Add(leadData);
            db.SaveChanges();

            return leadRecord.Entity;
        }

        [HttpPost("[action]")]
        public BusinessLead Update(BusinessLead leadData)
        {
            db.BusinessLeads.Update(leadData);
            return leadData;
        }
    }
}
