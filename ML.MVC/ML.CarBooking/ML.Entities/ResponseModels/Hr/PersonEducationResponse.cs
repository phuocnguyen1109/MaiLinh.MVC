using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities.ResponseModels.Hr
{
   public class PersonEducationResponse
    {
        public IEnumerable<PersonLanguage> PersonLanguages { get; set; }
        public IEnumerable<PersonWorkLicense> PersonWorkLicenses { get; set; }
        public PersonEducation PersonEducation { get; set; }
        public PersonDriveLicense PersonDriveLicense { get; set; }
    }
}
