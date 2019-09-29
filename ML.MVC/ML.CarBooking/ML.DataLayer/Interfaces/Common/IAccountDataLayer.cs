using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Interfaces.Common
{
   public interface IAccountDataLayer
    {
        bool UserLogin(string userName, string Password);
    }
}
