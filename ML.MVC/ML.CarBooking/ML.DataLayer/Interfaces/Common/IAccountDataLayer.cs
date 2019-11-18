using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Interfaces.Common
{
   public interface IAccountDataLayer
    {
        UserClaimsModel UserLogin(string userName, string Password);
    }
}
