using ML.Entities.VH;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities.ResponseModels
{
   public class ThongTin_PhuongTien
    {
        public PhuongTien PHUONGTIEN { get; set; }
        public GiayToXe GIAYTOXE { get; set; }
       // public IEnumerable<NhienLieuPhuongTien> NHIENLIEU { get; set; }
        public IEnumerable<TrangThietBi> TRANGTHIETBI { get; set; }

    }
}
