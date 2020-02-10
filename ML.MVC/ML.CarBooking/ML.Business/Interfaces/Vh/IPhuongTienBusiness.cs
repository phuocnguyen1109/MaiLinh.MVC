using ML.Entities.ResponseModels;
using ML.Entities.VH;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Interfaces.Vh
{
   public interface IPhuongTienBusiness
    {
        IEnumerable<Grid_PhuongTien> Get_All_PhuongTien();
        int Create_new_PhuongTien(PhuongTien model);
        ThongTin_PhuongTien Get_ThongTin_PhuongTien(int id);

        int Update_PhuongTien(PhuongTien model);
        int Update_GiayToXe(GiayToXe model);
        int Update_TrangThietBi(IEnumerable<TrangThietBi> models);
    }
}
