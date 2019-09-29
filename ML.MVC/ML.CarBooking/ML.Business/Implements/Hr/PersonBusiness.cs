using ML.Business.Interfaces.Hr;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities;
using ML.Entities.RequestModels.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Implements.Hr
{
    public class PersonBusiness : IPersonBusiness
    {
        private readonly IPersonDataLayer m_PersonDataLayer;

        public PersonBusiness(IPersonDataLayer personDataLayer)
        {
            m_PersonDataLayer = personDataLayer;
        }

        public int AddPersonIdentity(PersonIdentityCard request, int userId = 1)
        {
            return m_PersonDataLayer.AddPersonIdentity(request, userId);
        }

        public int AddPersonPhone(PersonPhone request, int userId = 1)
        {
            return m_PersonDataLayer.AddPersonPhone(request, userId);
        }

        public int CreatePersonContract(PersonContract request, int userId)
        {
            return m_PersonDataLayer.CreatePersonContract(request, userId);
        }

        public int CreateSimple(CreateSimpleRequest request)
        {
          return m_PersonDataLayer.CreateSimple(request);
        }

        public int DeletePersonContract(int id, int userId)
        {
            return m_PersonDataLayer.DeletePersonContract(id, userId);
        }

        public int DeletePersonIdentity(int id)
        {
            return m_PersonDataLayer.DeletePersonIdentity(id);
        }

        public int DeletePersonPhone(int id)
        {
            return m_PersonDataLayer.DeletePersonPhone(id);
        }

        public IEnumerable<PersonGridResponse> GetAllPerson()
        {
            return m_PersonDataLayer.GetAllPerson();
        }

        public IEnumerable<PersonAddress> GetPersonAddresses(int pid)
        {
            return m_PersonDataLayer.GetPersonAddresses(pid);
        }

        public IEnumerable<PersonContract> GetPersonContracts(int pid)
        {
            return m_PersonDataLayer.GetPersonContracts(pid);
        }

        public IEnumerable<PersonIdentityCard> GetPersonIdentities(int pid)
        {
            return m_PersonDataLayer.GetPersonIdentities(pid);
        }

        public PersonResponse GetPersonInformation(int id)
        {
           return m_PersonDataLayer.GetPersonInformation(id);
        }

        public IEnumerable<PersonPhone> GetPersonPhones(int pid)
        {
            return m_PersonDataLayer.GetPersonPhones(pid);
        }

        public PersonResponse GetPersonSIContracts(int pid)
        {
            return m_PersonDataLayer.GetPersonSIContracts(pid);
        }

        public int UpdatePersonAddress(IEnumerable<PersonAddress> request, int userId)
        {
            return m_PersonDataLayer.UpdatePersonAddress(request, userId);
        }

        public int UpdatePersonContract(PersonContract request, int userId)
        {
            return m_PersonDataLayer.UpdatePersonContract(request, userId);
        }

        public int UpdatePersonIdentity(PersonIdentityCard request, int userId = 1)
        {
            return m_PersonDataLayer.UpdatePersonIdentity(request, userId);
        }

        public int UpdatePersonInformation(PersonResponse request, int userId)
        {
          return m_PersonDataLayer.UpdatePersonInformation(request, userId);
        }

        public int UpdatePersonPhone(PersonPhone request, int userId = 1)
        {
            return m_PersonDataLayer.UpdatePersonPhone(request, userId);
        }

        public int UpdatePersonSIContract(PersonResponse request, int userId = 1)
        {
            return m_PersonDataLayer.UpdatePersonSIContract(request, userId);
        }

    }
}
