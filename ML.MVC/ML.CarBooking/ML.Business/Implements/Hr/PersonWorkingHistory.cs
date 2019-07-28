using ML.Business.Interfaces.Hr;
using ML.DataLayer.Interfaces;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Implements.Hr
{
    public class PersonWorkingHistory : IPersonWorkingHistory
    {
        private readonly IPersonWorkingHistoryDataLayer m_personWorkingHistoryDataLayer;

        public PersonWorkingHistory(IPersonWorkingHistoryDataLayer personWorkingHistoryDataLayer)
        {
            m_personWorkingHistoryDataLayer = personWorkingHistoryDataLayer;
        }

        public int CreateAndUpdate(PWH_GetAllByPerson request, int userId)
        {
            return m_personWorkingHistoryDataLayer.CreateAndUpdate(request, userId);
        }

        public int Delete(int id)
        {
            return m_personWorkingHistoryDataLayer.Delete(id);
        }

        public IEnumerable<PWH_GetAllByPerson> GetAllByPersonId(int personId)
        {
            return m_personWorkingHistoryDataLayer.GetAllByPersonId(personId);
        }

        public PWH_GetAllByPerson GetById(int id)
        {
            return m_personWorkingHistoryDataLayer.GetById(id);
        }
    }
}
