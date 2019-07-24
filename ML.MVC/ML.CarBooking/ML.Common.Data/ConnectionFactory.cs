using ML.Common.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Common.Data
{
    public class ConnectionFactory : IConnectionFactory
    {
        private readonly string m_ConnectionString;

        public ConnectionFactory(string connectionString)
        {
            m_ConnectionString = connectionString;
        }
        public IDbConnection CreateConnection()
        {
            var connect = new SqlConnection(m_ConnectionString);
            connect.Open();
            return connect;
        }
    }
}
