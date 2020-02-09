using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities.VH
{

    public class DINHNGHIA_PHUONGTIEN
    {
        public int ID { get; set; }
        public string DONGXE { get; set; }
        public string HIEUXE { get; set; }
        public string VT_DONGXE { get; set; }
        public string VT_HIEUXE { get; set; }
        public bool IS_DELETED { get; set; }
    }

    public class TrangThietBi
    {
        public int ID { get; set; }
        public int ID_PHUONGTIEN { get; set; }
        public int ID_THIETBI { get; set; }
        public int ID_YEUCAU { get; set; }
        public DateTime? NGAY_CAP { get; set; }
        public DateTime? NGAY_HET_HAN { get; set; }
        public DateTime? NGAY_GIAO_THEO_XE { get; set; }
        public bool TINH_TRANG { get; set; }

    }

    public class ThietBiGPS
    {
        public int ID { get; set; }
        public string KY_HIEU { get; set; }
        public string NHA_CUNG_CAP { get; set; }
        public string SO_SERI { get; set; }
        public string XBX_SIM { get; set; }
        public int ID_TINH_TRANG { get; set; }
        public string GHI_CHU { get; set; }
        public bool IS_DELETED { get; set; }
    }

    public class PhuongTien {
        public int ID { get; set; }
        public int DINHNGHIA_PT_ID { get; set; }
        public int DOIXE_THANG { get; set; }
        public int DOIXE_NAM { get; set; }
        public int THUTU { get; set; }
        public string CODE { get; set; }
        public int NAM_SX { get; set; }
        public DateTime? DK_LAN_1 { get; set; }
        public string SO_KHUNG { get; set; }
        public string SO_MAY { get; set; }
        public int SO_CHO { get; set; }
        public string MAU_XE { get; set; }
        public int ID_MAUXE { get; set; }
        public int ID_CONGSUAT { get; set; }
        public string SO_DANGKY { get; set; }
        public string CHU_XE { get; set; }
        public int ID_VUNGHOATDONG { get; set; }
        public DateTime? NGAY_NHAP { get; set; }
        public string GHICHU_NGAY_NHAP { get; set; }
        public DateTime? NGAY_THANHLY { get; set; }
        public string GHICHU_NGAY_THANHLY { get; set; }
        public int BAIXE_ID { get; set; }
        public string DIACHI_BAIXE { get; set; }
        public int CHIPHI_BAIXE { get; set; }
        public string VUNG_HD_ID { get; set; }
        public string GHICHU { get; set; }
        public bool IS_DELETED { get; set; }
        public int DUNG_TICH_XANG { get; set; }
    }

    public class NhienLieuPhuongTien
    {
        public int ID { get; set; }
        public int ID_PHUONGTIEN { get; set; }
        public DateTime? NGAY_DO { get; set; }
        public int KM_DAU { get; set; }
        public int KM_CUOI { get; set; }
        public int SO_LIT { get; set; }
        public int ID_LOAI_NL { get; set; }
        public int ID_CAYXANG { get; set; }
        public string LAI_XE { get; set; }
        public string GHI_CHU { get; set; }
        public bool IS_DELETED { get; set; }
    }

    public class GPSPhuongTien
    {

    }
}
