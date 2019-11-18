using ML.Common.Data;
using ML.Common.Data.Interfaces;
using ML.DataLayer.Interfaces.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using ML.Entities.ResponseModels.Hr;

namespace ML.DataLayer.Implements.Common
{
    public class AccountDataLayer : ConnectionBase, IAccountDataLayer
    {
        public AccountDataLayer(IConnectionFactory factory) : base(factory)
        {

        }

        public UserClaimsModel UserLogin(string userName, string Password)
        {
            return Execute(connection =>
              connection.Query<UserClaimsModel>("[Hr].[UserLogin]",
              new
              {
                 userName = userName,
                 password = Password
              },
              commandType: System.Data.CommandType.StoredProcedure)).FirstOrDefault();
        }
    }
}
