using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities
{
   public class PersonWorkLicense
    {
        public int Id { get; set; }
        public int WorkLisenceId { get; set; }
        public int Duration { get; set; }
        public DateTime FromDate { get; set; }
        public string IssuePlace { get; set; }
        public DateTime ToDate { get; set; }
        public int PersonId { get; set; }
    }
}
