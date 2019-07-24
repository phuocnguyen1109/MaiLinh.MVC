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

        public void Create(PWH_GetAllByPerson request)
        {
             m_personWorkingHistoryDataLayer.Create(request);
        }

        public void Delete(PWH_GetAllByPerson request)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PWH_GetAllByPerson> GetAllByPersonId(int personId)
        {
            return m_personWorkingHistoryDataLayer.GetAllByPersonId(personId);
        }

        public void Update(PWH_GetAllByPerson request)
        {
            throw new NotImplementedException();
        }
    }
}
