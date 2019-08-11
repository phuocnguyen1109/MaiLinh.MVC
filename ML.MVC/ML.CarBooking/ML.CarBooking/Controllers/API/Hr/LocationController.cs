using ML.Business.Implements.Hr;
using ML.Business.Interfaces.Hr;
using ML.Entities;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ML.CarBooking.Controllers.API.Hr
{
    public class LocationController : ApiController
    {
        private readonly ILocation m_locationBusiness;

        public LocationController(ILocation locationBusiness)
        {
            m_locationBusiness = locationBusiness;
        }

        public LocationObject GetAllLocation(int type, int parentId)
        {
            return m_locationBusiness.GetAllLocation(type, parentId);
        }

        public int AddOrUpdateLocation(MLocation request)
        {
            return m_locationBusiness.AddOrUpdateLocation(request);
        }
        public int DeleteLocation(IEnumerable<int> ids) {
            return m_locationBusiness.DeleteLocation(ids);
        }

         
    }
}
