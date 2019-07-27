using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Interfaces.Hr
{
   public interface IPersonWorkingHistory
    {
        IEnumerable<PWH_GetAllByPerson> GetAllByPersonId(int personId);
        int CreateAndUpdate(PWH_GetAllByPerson request, int userId);

        int Delete(IEnumerable<int> request);
        PWH_GetAllByPerson GetById(int id);


    }
}
