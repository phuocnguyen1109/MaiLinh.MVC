using ML.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Interfaces.Hr
{
   public interface IPersonMariageBusiness
    {
        IEnumerable<MMariageStatus> GetMMariageStatus();
    }
}
