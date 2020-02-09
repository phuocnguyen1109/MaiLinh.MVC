using ML.Business.Interfaces.Vh;
using ML.DataLayer.Interfaces.Vh;
using ML.Entities.VH;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Implements.Vh
{
    public class Dinhnghia_PhuongtienBusiness : IDinhnghia_PhuongtienBusiness
    {
        private readonly IDinhnghia_PhuongtienDataLayer m_Dinhnghia_PhuongTienDataLayer;

        public Dinhnghia_PhuongtienBusiness(IDinhnghia_PhuongtienDataLayer dinhnghia_phuongtienDataLayer)
        {
            m_Dinhnghia_PhuongTienDataLayer = dinhnghia_phuongtienDataLayer;
        }
        public int CreateOrUpdate_Dinhnghia_Phuongtien(DINHNGHIA_PHUONGTIEN model)
        {
            return m_Dinhnghia_PhuongTienDataLayer.CreateOrUpdate_Dinhnghia_Phuongtien(model);
        }

        public IEnumerable<DINHNGHIA_PHUONGTIEN> Get_Dinhnghia_Phuongtien()
        {
            return m_Dinhnghia_PhuongTienDataLayer.Get_Dinhnghia_Phuongtien();
        }
    }
}
