using ML.Entities;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Interfaces.Hr
{
   public interface ILocationDataLayer
    {
        LocationObject GetAllLocation(int type, int parentId);
        int AddOrUpdateLocation(MLocation request);
        int DeleteLocation(IEnumerable<int> ids);

        IEnumerable<MLocation> GetAllCity();
        IEnumerable<MLocation> GetAllDisctrictByCityId(int cityId);

    }
}
