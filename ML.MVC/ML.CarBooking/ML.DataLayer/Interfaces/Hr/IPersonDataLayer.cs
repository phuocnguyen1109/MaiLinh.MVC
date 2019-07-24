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
    }
}
