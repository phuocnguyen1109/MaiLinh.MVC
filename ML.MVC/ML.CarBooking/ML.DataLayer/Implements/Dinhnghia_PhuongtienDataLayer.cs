using Dapper;
using ML.Common.Data;
using ML.Common.Data.Interfaces;
using ML.DataLayer.Interfaces.Vh;
using ML.Entities.VH;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Implements
{
    public class Dinhnghia_PhuongtienDataLayer :ConnectionBase, IDinhnghia_PhuongtienDataLayer
    {
        public Dinhnghia_PhuongtienDataLayer(IConnectionFactory factory) : base(factory)
        {
        }
        public int CreateOrUpdate_Dinhnghia_Phuongtien(DINHNGHIA_PHUONGTIEN model)
        {
            return Execute(connection =>
             connection.Execute("[VH].[UPDATE_DINHNGHIA_PHUONGTIEN]",
             new
             {
                 ID = model.ID,
                 DONGXE = model.DONGXE,
                 HIEUXE = model.HIEUXE,
                 VT_DONGXE = model.VT_DONGXE,
                 VT_HIEUXE = model.VT_HIEUXE,
                 IS_DELETED = model.IS_DELETED
             }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public IEnumerable<DINHNGHIA_PHUONGTIEN> Get_Dinhnghia_Phuongtien()
        {
            return Execute(connection =>
            connection.Query<DINHNGHIA_PHUONGTIEN>("[VH].[GET_DINHNGHIA_PHUONGTIEN]", commandType: System.Data.CommandType.StoredProcedure));
        }
    }
}
