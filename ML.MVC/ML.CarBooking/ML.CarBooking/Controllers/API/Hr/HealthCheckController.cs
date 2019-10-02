using ML.Business.Interfaces.Hr;
using ML.Entities;
using ML.Entities.RequestModels.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ML.CarBooking.Controllers.API.Hr
{
    public class HealthCheckController : ApiController
    {
        private readonly IPersonHealthCheckBusiness m_healthCheckBusiness;

        public HealthCheckController(IPersonHealthCheckBusiness personHealthCheck)
        {
            m_healthCheckBusiness = personHealthCheck;
        }

        public IEnumerable<GetPersonHelthCheckByPerson> GetPersonHealthCheck(int pid)
        {
            return m_healthCheckBusiness.GetHealthCheckByPerson(pid);
        }

        [HttpPost]
        public int DeletePersonHealthCheck(PersonHealthCheck request)
        {
            return m_healthCheckBusiness.DeleteHealthCheck(request.Id);
        }

        public int CreateOrUpdateHealthStandard(CreateAndUpdatePersonHealthCheckRequest request, int userId = 1)
        {
            return m_healthCheckBusiness.CreatePersonHealthCheck(request, userId);
        }
    }
}
