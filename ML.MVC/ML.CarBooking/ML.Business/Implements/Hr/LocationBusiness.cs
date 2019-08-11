using ML.Business.Interfaces.Hr;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Implements.Hr
{
    public class LocationBusiness : ILocation
    {
        private readonly ILocationDataLayer m_LocationDataLayer;
        public LocationBusiness(ILocationDataLayer locationDataLayer)
        {
            m_LocationDataLayer = locationDataLayer;
        }

        public int AddOrUpdateLocation(MLocation request)
        {
            return m_LocationDataLayer.AddOrUpdateLocation(request);
        }

        public int DeleteLocation(IEnumerable<int> ids)
        {
            return m_LocationDataLayer.DeleteLocation(ids);
        }

        public LocationObject GetAllLocation(int type, int parentId)
        {
            return m_LocationDataLayer.GetAllLocation(type, parentId);
        }
    }
}
