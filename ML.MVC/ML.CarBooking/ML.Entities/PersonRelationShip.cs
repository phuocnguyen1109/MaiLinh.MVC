using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities
{
    public class PersonRelationShip
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public int YearOfBirth { get; set; }
        public bool IsDead { get; set; }
        public string Address { get; set; }
        public int PersonId { get; set; }
        public int RelationShipId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
    }
}
