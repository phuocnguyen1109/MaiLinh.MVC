using ML.Business.Interfaces.Hr;
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
    public class PersonController : ApiController
    {
        private readonly IPersonBusiness m_PersonBusiness;
        public PersonController(IPersonBusiness personBusiness)
        {
            m_PersonBusiness = personBusiness;

        }

        public IEnumerable<PersonGridResponse> GetAllPerson()
        {
            return m_PersonBusiness.GetAllPerson();
        }

        [HttpPost]
        public int CreateSimple(CreateSimpleRequest request)
        {
            return m_PersonBusiness.CreateSimple(request);
        }

        public PersonResponse GetPersonInformation(int id)
        {
            return m_PersonBusiness.GetPersonInformation(id);
        }


    }
}
