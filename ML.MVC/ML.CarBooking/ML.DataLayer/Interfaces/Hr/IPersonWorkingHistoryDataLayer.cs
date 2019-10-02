using ML.Entities;
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

        //Work Leave History
        IEnumerable<PersonWorkLeaveHistory> GetPersonWorkLeaveHistory(int pid);
        int CreatePersonWorkLeaveHistory(PersonWorkLeaveHistory request, int userId);
        int UpdatePersonWorkLeaveHistory(PersonWorkLeaveHistory request, int userId);
        int DeletePersonWorkLeaveHistory(int id, int userId);
    }
}
