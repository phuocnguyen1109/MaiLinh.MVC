using ML.Business.Interfaces.Common;
using ML.DataLayer.Interfaces.Common;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Implements
{
    public class AccountBusiness : IAccountBussiness
    {
        private readonly IAccountDataLayer m_AccountDataLayer;

        public AccountBusiness(IAccountDataLayer accountDataLayer)
        {
            m_AccountDataLayer = accountDataLayer;
        }

        

        public UserClaimsModel UserLogin(string userName, string password)
        {
            return m_AccountDataLayer.UserLogin(userName, password);
        }
    }
}
