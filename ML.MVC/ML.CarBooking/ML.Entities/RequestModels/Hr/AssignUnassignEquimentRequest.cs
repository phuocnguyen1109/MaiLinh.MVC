using System;

namespace ML.Entities.RequestModels.Hr
{
    public class AssignUnassignEquimentRequest
    {
        public int EquipmentId { get; set; }

        public int PersonId { get; set; }

        public DateTime? ReceivedDate { get; set; }

        public int? UserId { get; set; }

        public bool IsAssign { get; set; }
    }
}
