using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities.RequestModels.Hr
{
   public class CreateAndUpdatePersonHealthCheckRequest
    {
        public int Id { get; set; }
        public int Pid { get; set; }
        public IEnumerable<int> StandardIds { get; set; }
        public int Year { get; set; }
        public string Note { get; set; }
    }
}
