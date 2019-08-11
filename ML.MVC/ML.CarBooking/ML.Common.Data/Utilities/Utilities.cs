using ML.Entities;
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
    }
}
