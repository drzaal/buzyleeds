using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using buzyleeds.dbo;

namespace buzyleeds.Controllers
{


    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private TargetContext db;

        public ContactController(TargetContext context)
        {
            db = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<TargetContact> GetAll()
        {
            return db.TargetContacts.ToList();
        }

        [HttpGet("[action]/{id}")]
        public IEnumerable<TargetContact> GetByLead(int id)
        {
            return db.TargetContacts.Where(x=>x.Id == id).ToList();
        }

        [HttpGet("[action]")]
        public int TotalCount()
        {
            return db.TargetContacts.Count();
        }

        [HttpGet("[action]")]
        public TargetContact ContactDetail(int id)
        {
            return db.TargetContacts.Find(id);
        }

        [HttpDelete("[action]")]
        public void Delete(int id)
        {
            db.TargetContacts.Remove(db.TargetContacts.Find(id));
            db.SaveChanges();
        }

        [HttpPost("[action]")]
        public TargetContact SaveRecord([FromBody] TargetContact contactData)
        {
            if (contactData.Id == 0) contactData = db.TargetContacts.Add(contactData).Entity;
            else db.TargetContacts.Update(contactData);
            db.SaveChanges();

            return contactData;
        }
    }
}
