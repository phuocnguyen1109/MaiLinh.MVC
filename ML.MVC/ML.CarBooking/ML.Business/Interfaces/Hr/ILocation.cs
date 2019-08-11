using ML.Entities;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Interfaces.Hr
{
   public interface ILocation
    {
        LocationObject GetAllLocation(int type, int parentId);
        int AddOrUpdateLocation(MLocation request);
        int DeleteLocation(IEnumerable<int> ids);
    }
}
