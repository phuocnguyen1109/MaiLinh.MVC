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
        int CreateAndUpdate(PWH_GetAllByPerson request, int userId);

        int Delete(int id);
        PWH_GetAllByPerson GetById(int id);

    }
}
