using ML.Entities.RequestModels.Hr;
using ML.Entities.ResponseModels.Hr;
using System.Collections.Generic;

namespace ML.DataLayer.Interfaces.Hr
{
    public interface IEquipmentData
    {
        IList<EquipmentObject> GetAllEquipment();

        int CreateEditEquipment(CreateEditEquipmentRequest request);

    }
}
