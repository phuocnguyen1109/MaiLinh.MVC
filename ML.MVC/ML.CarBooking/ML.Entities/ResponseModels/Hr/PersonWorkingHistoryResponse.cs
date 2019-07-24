using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities.ResponseModels.Hr
{
   public class PWH_GetAllByPerson
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public DateTime Fromdate { get; set; }
        public DateTime ToDate { get; set; }
        public string CompanyName { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
