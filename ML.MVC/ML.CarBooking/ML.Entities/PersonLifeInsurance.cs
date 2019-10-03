using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities
{
   public class PersonLifeInsurance
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public string Number { get; set; }
        public int JoinLevel { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public int Amount { get; set; }
    }
}
