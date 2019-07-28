using Dapper;
using Dapper.FastCrud;
using ML.Common.Data;
using ML.Common.Data.Interfaces;
using ML.Common.Data.Utilities;
using ML.DataLayer.DataObject.Hr;
using ML.DataLayer.Interfaces;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Implements.Hr
{
    public class PersonWorkingHistoryDataLayer : ConnectionBase, IPersonWorkingHistoryDataLayer
    { 

        public PersonWorkingHistoryDataLayer(IConnectionFactory factory) : base(factory)
        {

        }

        public int CreateAndUpdate(PWH_GetAllByPerson request, int userId)
        {
            return Execute(connection => connection
                  .Execute("[Hr].[CreateOrUpDateWorkHistory]",
                  new
                  {
                      id = request.Id,
                      pid= request.PersonId,
                      fromDate = request.FromDate,
                      toDate = request.ToDate,
                      companyName = request.CompanyName,
                      userId = userId
                  }, commandType: CommandType.StoredProcedure));
        }

        public int Delete(int id)
        {
            
            return Execute(connection => connection
                  .Execute("[Hr].[DeleteWorkHistory]",
                  new
                  {
                      id=id
                  }, commandType: CommandType.StoredProcedure));
        }

        public IEnumerable<PWH_GetAllByPerson> GetAllByPersonId(int personId)
        {
            return Execute( connection => connection
                    .Query<PWH_GetAllByPerson>("[Hr].[GetWorkingHistoryByUser]",
                    new {
                        personId
                    }, commandType: CommandType.StoredProcedure));
        }

        public PWH_GetAllByPerson GetById(int id)
        {
            return Execute(connection => connection
                  .Query<PWH_GetAllByPerson>("[Hr].[GetWorkHistoryById]",
                  new
                  {
                      id = id
                  }, commandType: CommandType.StoredProcedure)).FirstOrDefault();
        }
    }
}
