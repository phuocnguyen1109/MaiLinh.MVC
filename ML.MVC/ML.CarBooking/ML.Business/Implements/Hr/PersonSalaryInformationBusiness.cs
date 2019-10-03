using ML.Business.Interfaces.Hr;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Implements.Hr
{
    public class PersonSalaryInformationBusiness : IPersonSalaryInformation
    {
        private readonly IPersonSalaryInformationDataLayer m_PersonSalaryDataLayer;
        public PersonSalaryInformationBusiness(IPersonSalaryInformationDataLayer personSalaryInformationDataLayer)
        {
            m_PersonSalaryDataLayer = personSalaryInformationDataLayer;
        }

        public int CreateOrUpdatePersonBankAccount(PersonBankAccount request, int userId)
        {
            return m_PersonSalaryDataLayer.CreateOrUpdatePersonBankAccount(request, userId);
        }

        public int CreateOrUpdatePersonLifeInsurance(PersonLifeInsurance request)
        {
            return m_PersonSalaryDataLayer.CreateOrUpdatePersonLifeInsurance(request);
        }

        public int DeletePersonBankAccount(int id, int userId)
        {
            return m_PersonSalaryDataLayer.DeletePersonBankAccount(id, userId);
        }

        public int DeletePersonLifeInsurance(int id)
        {
            return m_PersonSalaryDataLayer.DeletePersonLifeInsurance(id);
        }

        public IEnumerable<PersonBankAccount> GetPersonBankAccount(int pid)
        {
            return m_PersonSalaryDataLayer.GetPersonBankAccount(pid);
        }

        public IEnumerable<PersonLifeInsurance> GetPersonLifeInsurance(int pid)
        {
            return m_PersonSalaryDataLayer.GetPersonLifeInsurance(pid);
        }
    }
}
