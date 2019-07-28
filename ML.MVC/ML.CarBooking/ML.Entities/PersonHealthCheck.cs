using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities
{
  public class PersonHealthCheck
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public string Note { get; set; }
        public int PersonId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public IEnumerable<PersonHealthStd> PersonHealthStds { get; set; } 
    }
}
