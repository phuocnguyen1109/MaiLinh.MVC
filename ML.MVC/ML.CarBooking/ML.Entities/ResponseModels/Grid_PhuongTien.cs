using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities.ResponseModels
{
  public class Grid_PhuongTien
    {
        public int ID { get; set; }
        public string HIEUXE { get; set; }
        public int SO_CHO { get; set; }
        public int NAM_SX { get; set; }
        public int VUNG_HD_ID { get; set; }
        public DateTime? NGAY_NHAP { get; set; }
        public string GHICHU_NGAY_NHAP { get; set; }
        public DateTime? NGAY_THANHLY { get; set; }
        public string GHICHU_NGAY_THANHLY { get; set; }
        public int SO_KM_BAODUONG { get; set; }
        public string MAU_XE { get; set; }
        public int LOAIHINH_KD_ID { get; set; }
        public string LAIXE_BAOQUAN { get; set; }
    }
}
