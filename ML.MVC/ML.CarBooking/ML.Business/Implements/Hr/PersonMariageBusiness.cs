using ML.Business.Interfaces.Hr;
using ML.DataLayer.Implements.Hr;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Implements.Hr
{
    public class PersonMariageBusiness : IPersonMariageBusiness
    {
        private readonly IPersonMariage m_PersonMariage;
        public PersonMariageBusiness(IPersonMariage personMariage)
        {
            m_PersonMariage = personMariage;
        }

        public IEnumerable<MMariageStatus> GetMMariageStatus()
        {
            return m_PersonMariage.GetMMariageStatus();
        }
    }
}
