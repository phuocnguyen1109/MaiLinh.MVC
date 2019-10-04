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

        public int DeletePersonBankAccount(PersonBankAccount request, int userId)
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

        public int DeletePersonLifeInsurance(int id)
        {
            return m_personSalaryBusiness.DeletePersonLifeInsurance(id);
        }

        public IEnumerable<PersonRelationShip> GetPersonDependents(int pid)
        {
            return m_personSalaryBusiness.GetPersonDependents(pid);
        }
            
    }
}
