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

        public IEnumerable<MMariageStatus> GetMMariageStatuses()
        {
            return m_PersonMariageBusiness.GetMMariageStatus();
        }

    }
}
