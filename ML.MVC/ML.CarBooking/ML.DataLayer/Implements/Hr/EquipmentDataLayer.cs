using Dapper;
using ML.Common.Data;
using ML.Common.Data.Interfaces;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities.RequestModels.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Implements.Hr
{
    public class EquipmentDataLayer : ConnectionBase, IEquipmentData
    {
        public EquipmentDataLayer(IConnectionFactory factory) : base(factory)
        {

        }

        public int AssignUnassignPerson(AssignUnassignEquimentRequest request)
        {
            return Execute(connection =>
             (int)connection.ExecuteScalar("[Hr].[Equipment_AssignUnassign_Person]",
             new
             {
                 equipmentId = request.EquipmentId,
                 personId = request.PersonId,
                 receivedDate = request.ReceivedDate,
                 userId = request.UserId,
                 isAssign = request.IsAssign
             },
             commandType: System.Data.CommandType.StoredProcedure));
        }

        public int CreateEditEquipment(CreateEditEquipmentRequest request)
        {
            return Execute(connection =>
             (int)connection.ExecuteScalar("[Hr].[Equipment_Edit]",
             new
             {
                 equipmentId = request.Id,
                 equipmentName = request.Name,
                 userId = request.UserId
             },
             commandType: System.Data.CommandType.StoredProcedure));
        }

        public IList<EquipmentObject> GetAllEquipment()
        {
            return Execute(connection => connection.Query<EquipmentObject>("[Hr].[Equipment_List]", commandType: CommandType.StoredProcedure)).ToList();
        }
    }
}
