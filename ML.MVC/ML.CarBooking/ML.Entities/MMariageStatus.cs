using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities
{
   public class MMariageStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedIn { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? UpdatedIn { get; set; }
    }
}
