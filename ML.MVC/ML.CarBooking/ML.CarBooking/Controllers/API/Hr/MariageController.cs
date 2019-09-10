using ML.Business.Interfaces.Hr;
using ML.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ML.CarBooking.Controllers.API.Hr
{
    public class MariageController : ApiController
    {
        private readonly IPersonMariageBusiness m_PersonMariageBusiness;

        public MariageController(IPersonMariageBusiness personMariageBusiness)
        {
            m_PersonMariageBusiness = personMariageBusiness;
        }

        [HttpGet]
        public IEnumerable<MMariageStatus> GetMMariageStatuses()
        {
            return m_PersonMariageBusiness.GetMMariageStatus();
        }

        [HttpGet]
        public IEnumerable<PersonRelationShip> GetPersonRelationShips(int pid)
        {
            return m_PersonMariageBusiness.GetPersonRelationShips(pid);
        }

        [HttpPost]
        public int Add(PersonRelationShip model, int userId = 1)
        {
            return m_PersonMariageBusiness.AddPersonRelationShip(model, userId);
        }

        [HttpPost]
        public int Update(PersonRelationShip model, int userId = 1)
        {
            return m_PersonMariageBusiness.UpdatePersonRelationShip(model, userId);
        }

        [HttpPost]
        public int Delete(PersonRelationShip request)
        {
            return m_PersonMariageBusiness.DeletePersonRelationShip(request.Id);
        }
            

    }
}
