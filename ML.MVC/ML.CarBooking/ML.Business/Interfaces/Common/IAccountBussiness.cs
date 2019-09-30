using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Interfaces.Common
{
   public interface IAccountBussiness
    {
        bool UserLogin(string userName, string password);
    }
}
