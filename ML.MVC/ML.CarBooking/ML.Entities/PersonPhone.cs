using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities
{
    public class PersonPhone
    {
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public int PhoneType { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int PersonId { get; set; }
    }
}
