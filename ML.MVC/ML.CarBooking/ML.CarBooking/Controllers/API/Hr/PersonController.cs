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

        [HttpGet]
        public IEnumerable<PersonPhone> GetPersonPhones(int pid)
        {
            return m_PersonBusiness.GetPersonPhones(pid);
        }
        [HttpPost]
        public int AddPersonPhone(PersonPhone request, int userId = 1)
        {
            return m_PersonBusiness.AddPersonPhone(request, userId);
        }
        [HttpPost]
        public int UpdatePersonPhone(PersonPhone request, int userId = 1)
        {
            return m_PersonBusiness.UpdatePersonPhone(request, userId);
        }

        [HttpPost]
        public int DeletePersonPhone(PersonPhone phone)
        {
            return m_PersonBusiness.DeletePersonPhone(phone.Id);
        }

        [HttpGet]
        public IEnumerable<PersonIdentityCard> GetPersonIdentities(int pid)
        {
            return m_PersonBusiness.GetPersonIdentities(pid);
        }

        [HttpPost]
        public int AddPersonIdentity(PersonIdentityCard request, int userId = 1)
        {
            return m_PersonBusiness.AddPersonIdentity(request, userId);
        }

        [HttpPost]
        public int UpdatePersonIdentity(PersonIdentityCard request, int userId = 1)
        {
            return m_PersonBusiness.UpdatePersonIdentity(request, userId);
        }

        [HttpPost]
        public int DeletePersonIdentity(PersonIdentityCard request)
        {
            return m_PersonBusiness.DeletePersonIdentity(request.Id);
        }

        [HttpPost]
        public int UpdatePersonInformation(PersonResponse request, int userId = 1)
        {
            return m_PersonBusiness.UpdatePersonInformation(request, userId);
        }

    }
}
