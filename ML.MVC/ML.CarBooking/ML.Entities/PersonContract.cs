using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities
{
   public class PersonContract
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public int ContractTypeId { get; set; }
        public int ContractNumber { get; set; }
        public int Duration { get; set; }
        public DateTime? SignedIn { get; set; }
        public DateTime? SignOut { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public bool IsDeleted { get; set; }
    }
}
