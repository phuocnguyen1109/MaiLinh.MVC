using ML.Entities.VH;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Interfaces.Vh
{
  public interface IDinhnghia_PhuongtienBusiness
    {
        IEnumerable<DINHNGHIA_PHUONGTIEN> Get_Dinhnghia_Phuongtien();
        int CreateOrUpdate_Dinhnghia_Phuongtien(DINHNGHIA_PHUONGTIEN model);
    }
}
