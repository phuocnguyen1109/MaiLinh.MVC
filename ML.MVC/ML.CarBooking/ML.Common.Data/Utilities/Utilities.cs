using ML.Entities;
using ML.Entities.VH;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Common.Data.Utilities
{
   public static class Utilities
    {
        public static DataTable ConvertToDataTable(this IEnumerable<int> ids)
        {
            DataTable tblResult = new DataTable();
            tblResult.Columns.Add("Id", typeof(int));

            foreach (var item in ids)
            {
                tblResult.Rows.Add(item);
            }

            return tblResult;
        }

        public static DataTable ConvertToDataTable(this IEnumerable<PersonAddress> personAddress)
        {
            DataTable tblResult = new DataTable();
            tblResult.Columns.Add("PersonId", typeof(int));
            tblResult.Columns.Add("Type", typeof(int));
            tblResult.Columns.Add("Address", typeof(string));
            tblResult.Columns.Add("CityId", typeof(int));
            tblResult.Columns.Add("DistrictId", typeof(int));

            foreach (var item in personAddress)
            {
                tblResult.Rows.Add(item.PersonId, item.Type, item.Address, item.DistrictId, item.CityId);
            }

            return tblResult;
        }

        public static DataTable ConvertToDataTable(this IEnumerable<TrangThietBi> trangthietbi)
        {
            DataTable result = new DataTable();
            result.Columns.Add("ID", typeof(int));
            result.Columns.Add("ID_PHUONGTIEN", typeof(int));
            result.Columns.Add("ID_THIETBI", typeof(int));
            result.Columns.Add("ID_YEUCAU", typeof(int));
            result.Columns.Add("NGAY_CAP", typeof(DateTime));
            result.Columns.Add("NGAY_HET_HAN", typeof(DateTime));
            result.Columns.Add("NGAY_GIAO_THEO_XE", typeof(DateTime));
            result.Columns.Add("TINHTRANG", typeof(bool));

            foreach (var item in trangthietbi)
            {
                result.Rows.Add(item.ID, item.ID_PHUONGTIEN, item.ID_THIETBI, item.ID_YEUCAU, item.NGAY_CAP, item.NGAY_HET_HAN, item.NGAY_GIAO_THEO_XE, item.TINH_TRANG);
            }

            return result;

        }
    }
}
