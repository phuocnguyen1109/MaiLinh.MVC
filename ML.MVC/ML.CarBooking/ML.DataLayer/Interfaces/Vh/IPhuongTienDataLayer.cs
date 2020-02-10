using ML.Entities.ResponseModels;
using ML.Entities.VH;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Interfaces.Vh
{
    public interface IPhuongTienDataLayer
    {
        IEnumerable<Grid_PhuongTien> Get_All_PhuongTien();
        int Create_New_PhuongTien(PhuongTien model);
        ThongTin_PhuongTien Get_ThongTin_PhuongTien(int id);
        int Update_PhuongTien(PhuongTien model);
        int Update_GiayToXe(GiayToXe model);
        int Update_TrangThietBi(IEnumerable<TrangThietBi> models);
    }
}
