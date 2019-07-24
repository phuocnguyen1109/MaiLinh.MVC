using ML.Common.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Common.Data
{
   public abstract class ConnectionBase
    {
        private readonly IConnectionFactory m_ConnectionFactory;

        protected ConnectionBase(IConnectionFactory connectionFactory)
        {
            m_ConnectionFactory = connectionFactory;
        }

        protected T Execute<T>(Func<IDbConnection, T> action)
        {
            using (IDbConnection connection = m_ConnectionFactory.CreateConnection())
            {
                return action(connection);
            }
        }

        protected void Execute(Action<IDbConnection> action)
        {
            using (IDbConnection connection = m_ConnectionFactory.CreateConnection())
            {
                action(connection);
            }
        }

        

    }
}
