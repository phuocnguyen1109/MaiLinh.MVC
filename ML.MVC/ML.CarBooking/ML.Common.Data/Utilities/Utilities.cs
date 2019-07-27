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
    }
}
