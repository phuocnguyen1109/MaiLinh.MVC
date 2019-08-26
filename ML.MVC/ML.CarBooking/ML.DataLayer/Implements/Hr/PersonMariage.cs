using ML.Common.Data;
using ML.Common.Data.Interfaces;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace ML.DataLayer.Implements.Hr
{
    public class PersonMariageDataLayer : ConnectionBase, IPersonMariage
    {
        public PersonMariageDataLayer(IConnectionFactory factory) : base(factory)
        {

        }

        public IEnumerable<MMariageStatus> GetMMariageStatus()
        {
            return Execute(connection => connection.Query<MMariageStatus>("[Hr].[GetMMariageStatus]", commandType: System.Data.CommandType.StoredProcedure));
        }
    }
}
