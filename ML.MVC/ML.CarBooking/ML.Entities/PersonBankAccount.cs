using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities
{
   public class PersonBankAccount
    {
        public int Id { get; set; }
        public int PersonId { get; set;}
        public string AccountName { get; set; }
        public int BankId { get; set; }
        public string AccountNumber { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }


    }
}
