using ML.Entities;
using ML.Entities.RequestModels.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Interfaces.Hr
{
   public interface IPersonBusiness
    {
        IEnumerable<PersonGridResponse> GetAllPerson();
        int CreateSimple(CreateSimpleRequest request);
        PersonResponse GetPersonInformation(int id);
        int UpdatePersonInformation(PersonResponse request, int userId);

        //Phone
        IEnumerable<PersonPhone> GetPersonPhones(int pid);
        int AddPersonPhone(PersonPhone request, int userId = 1);
        int UpdatePersonPhone(PersonPhone request, int userId = 1);
        int DeletePersonPhone(int id);

        //Identity
        IEnumerable<PersonIdentityCard> GetPersonIdentities(int pid);
        int AddPersonIdentity(PersonIdentityCard request, int userId = 1);
        int UpdatePersonIdentity(PersonIdentityCard request, int userId = 1);
        int DeletePersonIdentity(int id);

        //SI
        PersonResponse GetPersonSIContracts(int pid);
        int UpdatePersonSIContract(PersonResponse request, int userId = 1);

        //Address
        IEnumerable<PersonAddress> GetPersonAddresses(int pid);
        int UpdatePersonAddress(IEnumerable<PersonAddress> request, int userId);

        //Contracts
        IEnumerable<PersonContract> GetPersonContracts(int pid);
        int CreatePersonContract(PersonContract request, int userId);
        int UpdatePersonContract(PersonContract request, int userId);
        int DeletePersonContract(int id, int userId);

        IEnumerable<PersonEquipment> GetPersonEquipments(int pid);
        int CreateOrUpdatePersonEquipment(PersonEquipment request);
    }
}
