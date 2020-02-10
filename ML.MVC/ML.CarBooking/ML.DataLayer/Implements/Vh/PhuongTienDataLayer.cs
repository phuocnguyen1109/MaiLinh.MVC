using Dapper;
using ML.Common.Data;
using ML.Common.Data.Interfaces;
using ML.Common.Data.Utilities;
using ML.DataLayer.Interfaces.Vh;
using ML.Entities.ResponseModels;
using ML.Entities.VH;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Implements.Vh
{
    public class PhuongTienDataLayer :ConnectionBase, IPhuongTienDataLayer
    {
        public PhuongTienDataLayer(IConnectionFactory factory) : base(factory)
        {

        }
        public int Create_New_PhuongTien(PhuongTien model)
        {
            return Execute(connection =>
            connection.ExecuteScalar<int>("[VH].[CREATE_NEW_PHUONGTIEN]",
            new
            {
                DINHNGHIA_PT_ID = model.DINHNGHIA_PT_ID,
                THANG = model.DOIXE_THANG,
                NAM = model.DOIXE_NAM,
                THUTU = model.THUTU,
                CODE = model.CODE,
                SOCHO = model.SO_CHO
            }, commandType: System.Data.CommandType.StoredProcedure));
        }

            public IEnumerable<Grid_PhuongTien> Get_All_PhuongTien()
        {
            return Execute(connection =>
             connection.Query<Grid_PhuongTien>("[VH].[GET_ALL_PHUONGTIEN]", commandType: System.Data.CommandType.StoredProcedure));
        }

        public ThongTin_PhuongTien Get_ThongTin_PhuongTien(int id)
        {
            ThongTin_PhuongTien response = new ThongTin_PhuongTien();
            return Execute(connection =>
            {
                using (var result = connection.QueryMultiple("[VH].[GET_THONGTIN_PHUONGTIEN_BY_ID]",
                    new
                    {
                        ID = id
                    },
                    commandType: System.Data.CommandType.StoredProcedure))
                {
                    response.PHUONGTIEN = result.Read<PhuongTien>().FirstOrDefault();
                    response.GIAYTOXE = result.Read<GiayToXe>().FirstOrDefault();
                    response.TRANGTHIETBI = result.Read<TrangThietBi>();
                    return response;
                }
            });
        }

        public int Update_GiayToXe(GiayToXe model)
        {
            return Execute(connection =>

                connection.ExecuteScalar<int>("[VH].[UPDATE_GIAYTOXE]", new
                {
                    ID = model.ID,
                    ID_PT = model.ID_PHUONGTIEN,
                    ID_LOAI_CAVET = model.ID_LOAI_CAVET,
                    TEN_NGAN_HANG = model.TEN_NGAN_HANG,
                    NGUOI_PT = model.NGUOI_PHU_TRACH,
                    THOI_HAN_BAN_SAO = model.THOI_HAN_BAN_SAO,
                    BHDS_NGAYHETHAN = model.BHDS_BGAYHETHAN,
                    BHDS_TEN_CTY_BH = model.BHDS_TEN_CTY_BH,
                    BHVC_NGAYHETHAN = model.BHVC_NGAYHETHAN,
                    BHVC_TEN_CTY_BH = model.BHVC_TEN_CTY_BH,
                    BHVC_NOIBO = model.BHVC_NOIBO,
                    BHVC_BENNGOAI = model.BHVC_BENNGOAI,
                    KIEMDINH_TEMXANH = model.KIEMDINH_TEMXANH,
                    KIEMDINH_TEMVANG = model.KIEMDINH_TEMVANG,
                    PHI_SD_DB = model.PHI_SD_DUONGBO_NGAY_HETHAN,
                    SO_THANG_DONG = model.SO_THANG_DONG,
                    THOIHAN_PHUHIEU_HOPDONG = model.THOIHAN_PHUHIEU_HOPDONG,
                    GHICHU = model.GHICHU
                }, commandType: System.Data.CommandType.StoredProcedure)) ;
        }

        public int Update_PhuongTien(PhuongTien model)
        {
            return Execute(connection =>
            
                connection.ExecuteScalar<int>("[VH].[UPDATE_PHUONGTIEN]", new {
                    NSX = model.NAM_SX,
                    SO_KHUNG = model.SO_KHUNG,
                    CHU_XE = model.CHU_XE,
                    NGAY_NHAP = model.NGAY_NHAP,
                    GHICHU_NGAYNHAP = model.GHICHU_NGAY_NHAP,
                    NGAY_TL = model.NGAY_THANHLY,
                    GHICHU_NGAY_TL = model.GHICHU_NGAY_THANHLY,
                    DINHNGHIA_PT_ID = model.DINHNGHIA_PT_ID,
                    SO_CHO = model.SO_CHO,
                    SO_MAY = model.SO_MAY,
                    DK_LAN_1 = model.DK_LAN_1,
                    SO_DK = model.SO_DANGKY,
                    MAU_XE= model.MAU_XE,
                    ID = model.ID,
                    ID_CONGSUAT = model.ID_CONGSUAT,
                    ID_VUNGHOATDONG = model.ID_VUNGHOATDONG,
                    ID_BAIXE = model.BAIXE_ID,
                    DIACHI_BAIXE = model.DIACHI_BAIXE,
                    CHIPHI_BAI_XE = model.CHIPHI_BAIXE,
                    DUNG_TICH_XANG = model.DUNG_TICH_XANG
                }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int Update_TrangThietBi(IEnumerable<TrangThietBi> models)
        {
            DataTable param = models.ConvertToDataTable();
            int vh_id = Convert.ToInt32(param.Rows[0]["ID_PHUONGTIEN"]);
           
            return Execute(connection =>

                connection.ExecuteScalar<int>("[VH].[UPDATE_TRANGTHIETBI]", new
                {
                    tblDATA = param,
                    VH_ID = vh_id
                }, commandType: System.Data.CommandType.StoredProcedure));
        }
    }
}
