using ML.Business.Interfaces.Vh;
using ML.Entities.ResponseModels;
using ML.Entities.VH;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ML.CarBooking.Controllers.API.Vh
{
    public class PhuongTienController : ApiController
    {
        private readonly IPhuongTienBusiness m_PhuongtienBusiness;

        public PhuongTienController(IPhuongTienBusiness phuongtienBusiness)
        {
            m_PhuongtienBusiness = phuongtienBusiness;
        }

        [HttpGet]
        public IEnumerable<Grid_PhuongTien> Get_List_PhuongTien()
        {
            return m_PhuongtienBusiness.Get_All_PhuongTien();
        }

        [HttpPost]
        public int Create_New_PhuongTien(PhuongTien model)
        {
            return m_PhuongtienBusiness.Create_new_PhuongTien(model);
        }

        [HttpGet]
        public ThongTin_PhuongTien Get_ThongTin_PhuongTien(int id)
        {
            return m_PhuongtienBusiness.Get_ThongTin_PhuongTien(id);
        }

        [HttpPost]
        public int Update_ThongTin_PhuongTien(ThongTin_PhuongTien model)
        {
            int result = m_PhuongtienBusiness.Update_PhuongTien(model.PHUONGTIEN);
                result = model.GIAYTOXE != null ? m_PhuongtienBusiness.Update_GiayToXe(model.GIAYTOXE) : 0;
                result = m_PhuongtienBusiness.Update_TrangThietBi(model.TRANGTHIETBI);
            return result;
        }
    }
}
