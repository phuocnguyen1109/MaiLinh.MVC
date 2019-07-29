using ML.Entities;
using ML.Entities.RequestModels.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Interfaces.Hr
{
   public interface IPersonDataLayer
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
        int AddPersonIdentity(PersonIdentityCard request, int userId =1);
        int UpdatePersonIdentity(PersonIdentityCard request, int userId = 1);
        int DeletePersonIdentity(int id);

        //SI
        PersonResponse GetPersonSIContracts(int pid);
        int UpdatePersonSIContract(PersonResponse request, int userId = 1);
    }
}
