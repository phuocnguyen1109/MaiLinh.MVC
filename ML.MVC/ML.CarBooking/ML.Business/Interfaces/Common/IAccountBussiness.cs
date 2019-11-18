using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ML.Entities.ResponseModels.Hr;

namespace ML.Business.Interfaces.Common
{
   public interface IAccountBussiness
    {
        UserClaimsModel UserLogin(string userName, string password);
    }
}
