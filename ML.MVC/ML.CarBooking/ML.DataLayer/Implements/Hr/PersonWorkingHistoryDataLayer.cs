using Dapper;
using ML.Common.Data;
using ML.Common.Data.Interfaces;
using ML.DataLayer.Interfaces;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Data;
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
        public IEnumerable<PWH_GetAllByPerson> GetAllByPersonId(int personId)
        {
            return Execute( connection => connection
                    .Query<PWH_GetAllByPerson>("[Hr].[GetWorkingHistoryByUser]",
                    new {
                        personId
                    }, commandType: CommandType.StoredProcedure));
        }
    }
}
