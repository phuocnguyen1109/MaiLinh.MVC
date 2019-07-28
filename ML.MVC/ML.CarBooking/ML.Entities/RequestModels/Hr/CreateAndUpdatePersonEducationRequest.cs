using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities.RequestModels.Hr
{
  public  class CreateAndUpdatePersonEducationRequest
    {
        public int PId { get; set; }
        public int GradeId { get; set; }
        public string Major { get; set; }
        public int DriveTypeId { get; set; }
        public DateTime ExpiredOn { get; set; }
        public string SignedPlace { get; set; }
    }
}
