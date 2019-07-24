using ML.Business.Interfaces.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

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

        public int Create(PWH_GetAllByPerson request)
        {
            m_personWorkingHistory.Create(request);
            return 1;
        }

        public int Update(PWH_GetAllByPerson request)
        {
            return 1;
        }

        public int Delete(PWH_GetAllByPerson request)
        {
            return 1;
        }
    }
}
