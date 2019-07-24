using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.DataObject.Hr
{

   public class PersonWorkHistory
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
