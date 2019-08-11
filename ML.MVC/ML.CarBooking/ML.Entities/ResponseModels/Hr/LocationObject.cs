using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities.ResponseModels.Hr
{
  public class LocationObject
    {
       public IEnumerable<MLocation> Country { get; set; }
       public IEnumerable<MLocation> City { get; set; }
       public IEnumerable<MLocation> District { get; set; }
    }
}
