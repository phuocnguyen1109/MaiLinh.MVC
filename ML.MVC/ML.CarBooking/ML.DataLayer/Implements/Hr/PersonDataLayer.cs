using ML.Common.Data;
using ML.Common.Data.Interfaces;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ML.Entities.RequestModels.Hr;

namespace ML.DataLayer.Implements.Hr
{
    public class PersonDataLayer : ConnectionBase, IPersonDataLayer
    {

        public PersonDataLayer(IConnectionFactory factory) : base(factory)
        {

        }

        public int CreateSimple(CreateSimpleRequest request)
        {
            return Execute(connection =>
                (int)connection.ExecuteScalar("[Hr].[CreateSimplePerson]",
                new
                {
                    firstName = request.FirstName,
                    lastName = request.LastName,
                    userName = request.UserName,
                    gender = request.Gender
                }, commandType: System.Data.CommandType.StoredProcedure)); 
        }

        public IEnumerable<PersonGridResponse> GetAllPerson()
        {
            return Execute(connection => 
            connection.Query<PersonGridResponse>("[Hr].[GetAllPerson]", commandType: System.Data.CommandType.StoredProcedure));
        }

        public PersonResponse GetPersonInformation(int id)
        {
            return Execute(connection =>
            connection.Query<PersonResponse>("[Hr].[GetPersonInformation]",
            new {
                id
            }, commandType: System.Data.CommandType.StoredProcedure)).FirstOrDefault();
        }
    }
}
