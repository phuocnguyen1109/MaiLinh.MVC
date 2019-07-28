using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities
{
   public class PersonIdentityCard
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public int IdentityTypeId { get; set; }
        public string PlaceReleased { get; set; }
        public DateTime DateReleased { get; set; }
        public string Number { get; set; }
        

    }
}
