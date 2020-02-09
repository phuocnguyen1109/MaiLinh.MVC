using ML.Business.Interfaces.Vh;
using ML.Entities.VH;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ML.CarBooking.Controllers.API.Vh
{
    public class DinhNghia_PhuongTienController : ApiController
    {
        private readonly IDinhnghia_PhuongtienBusiness m_Dinhnghia_PhuongtienBusiness;
        public DinhNghia_PhuongTienController(IDinhnghia_PhuongtienBusiness dinhnghia_PhuongtienBusiness) {
            m_Dinhnghia_PhuongtienBusiness = dinhnghia_PhuongtienBusiness;
        }

        [HttpGet]
        public IEnumerable<DINHNGHIA_PHUONGTIEN> GetAll_Dinhnghia_Phuongtien()
        {
            return m_Dinhnghia_PhuongtienBusiness.Get_Dinhnghia_Phuongtien();
        }

        [HttpPost]
        public int CreateOrUpdate_Dinhnghia_Phuongtien(DINHNGHIA_PHUONGTIEN model)
        {
            return m_Dinhnghia_PhuongtienBusiness.CreateOrUpdate_Dinhnghia_Phuongtien(model);
        }
    }
}
