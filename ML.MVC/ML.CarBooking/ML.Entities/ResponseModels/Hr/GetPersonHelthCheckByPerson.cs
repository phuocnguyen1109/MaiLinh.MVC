using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities.ResponseModels.Hr
{
   public class GetPersonHelthCheckByPerson
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public int Year { get; set; }
        public string StandardName { get; set; }
        public string Note { get; set; }
    }
}
