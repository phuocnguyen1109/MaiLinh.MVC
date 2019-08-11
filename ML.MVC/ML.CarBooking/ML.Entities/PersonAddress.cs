using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities
{
    public class PersonAddress
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public int Type { get; set; }
        public string Address { get; set; }
        public int CityId { get; set; }
        public int DistrictId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
    }
}
