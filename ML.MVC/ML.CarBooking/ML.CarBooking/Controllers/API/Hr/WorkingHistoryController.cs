using ML.Business.Interfaces.Hr;
using ML.Entities;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ML.CarBooking.Controllers.API.Hr
{
    public class WorkingHistoryController : ApiController
    {
        private readonly IPersonWorkingHistory m_personWorkingHistory;

        public WorkingHistoryController(IPersonWorkingHistory personWorkingHistory) : base()
        {
            m_personWorkingHistory = personWorkingHistory;
        }

        [System.Web.Http.HttpGet]
        public IEnumerable<PWH_GetAllByPerson> GetAllByPerson(int personId)
        {
            return m_personWorkingHistory.GetAllByPersonId(personId);
        }

        [HttpPost]
        public int CreateOrUpdate(PWH_GetAllByPerson request, int userId =1)
        {

            return m_personWorkingHistory.CreateAndUpdate(request, userId);
        }

        [HttpPost]
        public int Delete(PWH_GetAllByPerson request)
        {
            return m_personWorkingHistory.Delete(request.Id);
        }


        public IEnumerable<PersonWorkLeaveHistory> GetPersonWorkLeaveHistory(int pid)
        {
            return m_personWorkingHistory.GetPersonWorkLeaveHistory(pid);
        }

        public int CreatePersonWorkLeaveHistory(PersonWorkLeaveHistory request, int userId = 1)
        {
            return m_personWorkingHistory.CreatePersonWorkLeaveHistory(request, userId);
        }

        public int UpdatePersonWorkLeaveHistory(PersonWorkLeaveHistory request, int userId = 1)
        {
            return m_personWorkingHistory.UpdatePersonWorkLeaveHistory(request, userId);
        }

        [HttpPost]
        public int DeletePersonWorkLeaveHistory(PersonWorkLeaveHistory request, int userId = 1)
        {
            return m_personWorkingHistory.DeletePersonWorkLeaveHistory(request.Id, userId);
        }
        
    }
}
