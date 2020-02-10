using ML.Business.Interfaces.Vh;
using ML.DataLayer.Interfaces.Vh;
using ML.Entities.ResponseModels;
using ML.Entities.VH;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Implements.Vh
{
    public class PhuongTienBusiness : IPhuongTienBusiness
    {
        private readonly IPhuongTienDataLayer m_PhuongtienDataLayer;

        public PhuongTienBusiness(IPhuongTienDataLayer phuongtienDataLayer) {
            m_PhuongtienDataLayer = phuongtienDataLayer;
        }
        public int Create_new_PhuongTien(PhuongTien model)
        {
            return m_PhuongtienDataLayer.Create_New_PhuongTien(model);
        }

        public IEnumerable<Grid_PhuongTien> Get_All_PhuongTien()
        {
            return m_PhuongtienDataLayer.Get_All_PhuongTien();
        }

        public ThongTin_PhuongTien Get_ThongTin_PhuongTien(int id)
        {
            return m_PhuongtienDataLayer.Get_ThongTin_PhuongTien(id);
        }

        public int Update_GiayToXe(GiayToXe model)
        {
            return m_PhuongtienDataLayer.Update_GiayToXe(model);
        }

        public int Update_PhuongTien(PhuongTien model)
        {
            return m_PhuongtienDataLayer.Update_PhuongTien(model);
        }

        public int Update_TrangThietBi(IEnumerable<TrangThietBi> models)
        {
            return m_PhuongtienDataLayer.Update_TrangThietBi(models);
        }
    }
}
