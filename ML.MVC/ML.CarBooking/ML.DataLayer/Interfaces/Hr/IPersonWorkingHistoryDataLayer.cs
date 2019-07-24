using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Interfaces.Hr
{
   public interface IPersonWorkingHistoryDataLayer
    {
        IEnumerable<PWH_GetAllByPerson> GetAllByPersonId(int personId);
        void Create(PWH_GetAllByPerson request);
        void Update(PWH_GetAllByPerson request);
        void Delete(PWH_GetAllByPerson request);
    }
}
