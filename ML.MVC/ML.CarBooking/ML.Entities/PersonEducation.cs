using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities
{
   public class PersonEducation
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public int GradeId { get; set; }
        public string Major { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }

        public PersonDriveLicense PersonDriveLicense { get; set; }
        public IEnumerable<PersonWorkLicense> PersonWorkLicenses { get; set; }
    }
}
