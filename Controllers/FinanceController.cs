using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using buzyleeds.dbo;

namespace buzyleeds.Controllers
{


    [Route("api/[controller]")]
    public class FinanceController : Controller
    {
        private TargetContext db;

        public FinanceController(TargetContext context)
        {
            db = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<Financial> GetAll()
        {
            return db.Financials.ToList();
        }

        [HttpGet("[action]")]
        public int TotalCount()
        {
            return db.Financials.Count();
        }

        [HttpGet("[action]/{id}")]
        public IEnumerable<Financial> GetByLead(int id)
        {
            return db.Financials.Where(x => x.LeadId == id);
        }

        [HttpGet("[action]/{id}")]
        public Financial GetById(int id)
        {
            return db.Financials.Find(id);
        }

        [HttpDelete("[action]/{id}")]
        public void DeleteRecord(int id)
        {
            db.TargetContacts.Remove(db.TargetContacts.Find(id));
            db.SaveChanges();
        }

        [HttpPost("[action]")]
        public Financial SaveRecord([FromBody] Financial financialData)
        {
            if (financialData.Id == 0) financialData = db.Financials.Add(financialData).Entity;
            else db.Financials.Update(financialData);
            db.SaveChanges();

            return financialData;
        }
    }
}
