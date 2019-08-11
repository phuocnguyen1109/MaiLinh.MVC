using Dapper;
using ML.Common.Data;
using ML.Common.Data.Interfaces;
using ML.Common.Data.Utilities;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Implements.Hr
{
    public class LocationDataLayer :ConnectionBase, ILocationDataLayer
    {
        public LocationDataLayer(IConnectionFactory factory) : base(factory)
        {

        }

        public int AddOrUpdateLocation(MLocation request)
        {
            return Execute(connection => 
             (int)connection.ExecuteScalar("[Hr].[AddOrUpdateLocation]", 
             new {
                 id = request.Id,
                 parentId = request.ParentId,
                 name = request.Name,
                 type = request.Type
             },
             commandType: System.Data.CommandType.StoredProcedure));
        }

        public int DeleteLocation(IEnumerable<int> ids)
        {
            DataTable idstbl = new DataTable();
            idstbl = ids.ConvertToDataTable();
            return Execute(connection =>
             (int)connection.ExecuteScalar("[Hr].[DeleteLocation]",
             new
             {
                ids = idstbl
             },
             commandType: System.Data.CommandType.StoredProcedure));
        }

        public IEnumerable<MLocation> GetAllCity()
        {
            return Execute(connection => connection.Query<MLocation>("[Hr].[GetAllCity]", commandType: CommandType.StoredProcedure));
        }

        public IEnumerable<MLocation> GetAllDisctrictByCityId(int cityId)
        {
            return Execute(connection => connection.Query<MLocation>("[Hr].[GetAllDisctrictByCityId]",new { cityId = cityId }, commandType: CommandType.StoredProcedure));
        }

        public LocationObject GetAllLocation(int type, int parentId)
        {
            var locationObject = new LocationObject();
            var result = Execute(connection => connection.QueryMultiple("",
                new {
                    type = type,
                    parentId = parentId
                }, commandType: CommandType.StoredProcedure));

            locationObject.Country = result.ReadFirstOrDefault();
            locationObject.City = result.Read<MLocation>();
            locationObject.District = result.Read<MLocation>();
            return locationObject;
        }
    }
}
