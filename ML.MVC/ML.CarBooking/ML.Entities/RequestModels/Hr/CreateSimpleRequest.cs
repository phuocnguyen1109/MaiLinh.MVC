using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities.RequestModels.Hr
{
    public class CreateSimpleRequest
    {
        public string FirstName{ get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public int Gender { get; set; }
        public string EmployeeCode { get; set; }
    }
}
