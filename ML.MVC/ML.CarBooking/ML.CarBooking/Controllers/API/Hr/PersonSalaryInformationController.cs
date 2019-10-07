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
    public class PersonSalaryInformationController : ApiController
    {
        private readonly IPersonSalaryInformation m_personSalaryBusiness;
        public PersonSalaryInformationController(IPersonSalaryInformation personSalaryInformation)
        {
            m_personSalaryBusiness = personSalaryInformation;
        }

        
        public IEnumerable<PersonBankAccount> GetPersonBankAccount(int pid)
        {
            return m_personSalaryBusiness.GetPersonBankAccount(pid);
        }

        public int CreateOrUpdatePersonBankAccount(PersonBankAccount request, int userID = 1)
        {
            return m_personSalaryBusiness.CreateOrUpdatePersonBankAccount(request, userID);
        }

        [HttpPost]
        public int DeletePersonBankAccount(PersonBankAccount request, int userId =1)
        {
            return m_personSalaryBusiness.DeletePersonBankAccount(request.Id, userId);
        }

        public IEnumerable<PersonLifeInsurance> GetPersonLifeInsurances(int pid)
        {
            return m_personSalaryBusiness.GetPersonLifeInsurance(pid);
        }

        public int CreateOrUpdatePersonLifeInsurance(PersonLifeInsurance request)
        {
            return m_personSalaryBusiness.CreateOrUpdatePersonLifeInsurance(request);
        }

        [HttpPost]
        public int DeletePersonLifeInsurance(PersonLifeInsurance request, int userId = 1)
        {
            return m_personSalaryBusiness.DeletePersonLifeInsurance(request.Id);
        }

        public IEnumerable<PersonRelationShip> GetPersonDependents(int pid)
        {
            return m_personSalaryBusiness.GetPersonDependents(pid);
        }

        [HttpGet]
        public IEnumerable<PersonHealthInsurance> GetPersonHealthInsurances(int pid)
        {
            return m_personSalaryBusiness.GetPersonHealthInsurances(pid);
        }

        public int CreateOrUpdatePersonHealthInsurance(PersonHealthInsurance request, int userId = 1)
        {
            return m_personSalaryBusiness.CreateOrUpdatePersonHealthInsurance(request, userId);
        }
            
    }
}
