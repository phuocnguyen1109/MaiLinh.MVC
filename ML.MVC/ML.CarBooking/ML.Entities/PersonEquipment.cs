using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities
{
   public class PersonEquipment
    {
        public int Id { get; set; }
        public int EquipmentId { get; set; }
        public DateTime? ReceivedDate { get; set; }
        public int PersonId { get; set; }

    }
}
