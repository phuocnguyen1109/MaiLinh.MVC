using ML.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Interfaces.Hr
{
   public interface IPersonMariage 
    {
        IEnumerable<MMariageStatus> GetMMariageStatus();
    }
}
