using Dapper;
using ML.Common.Data;
using ML.Common.Data.Interfaces;
using ML.Common.Data.Utilities;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities;
using ML.Entities.RequestModels.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Implements.Hr
{
    public class PersonHealthCheckDataLayer : ConnectionBase, IPersonHealthCheck
    {
        public PersonHealthCheckDataLayer(IConnectionFactory factory) : base(factory)
        {

        }

        public int CreateAndUpdateMHealthCheck(MHealthCheck request, int userId)
        {
            return Execute(connection => connection.Execute("[Hr].[CreateAndUpdateMHealthCheck]",
                new {
                    id = request.Id,
                    name = request.Name,
                    userId = userId
                },
                commandType: System.Data.CommandType.StoredProcedure));
        }

        public int CreatePersonHealthCheck(CreateAndUpdatePersonHealthCheckRequest request, int userId)
        {
            DataTable stdIds = new DataTable();
            stdIds = request.StandardIds.ConvertToDataTable();
            return Execute(connection => connection.Execute("[Hr].[CreateAndUpdateMHealthCheck]",
                new
                {
                   pid = request.Pid,
                   userId = userId,
                   stdIds = stdIds,
                   year = request.Year,
                   note = request.Note
                },
                commandType: System.Data.CommandType.StoredProcedure));
        }

        public int DeleteHealthCheck(int id)
        {
            return Execute(connection => connection.Execute("[Hr].[DeleteHealthCheck]",
                new
                {
                    id=id
                },
                commandType: System.Data.CommandType.StoredProcedure)) ;
        }

        public int DeleteMHealthCheck(IEnumerable<int> ids)
        {
            DataTable idsTbl = new DataTable();
            idsTbl = ids.ConvertToDataTable();
            return Execute(connection => connection.Execute("[Hr].[DeleteMHealthCheck]",
                new
                {
                    ids = idsTbl
                },
                commandType: System.Data.CommandType.StoredProcedure));
        }

        public IEnumerable<GetPersonHelthCheckByPerson> GetHealthCheckByPerson(int pid)
        {
            return Execute(connection => connection.Query<GetPersonHelthCheckByPerson>("[Hr].[GetPersonHealthCheck]",
                new { pid = pid },
                commandType: CommandType.StoredProcedure));
        }

        public IEnumerable<MHealthCheck> GetMHealthCheck()
        {
            return Execute(connection => connection.Query<MHealthCheck>("[Hr].[GetMHealthCheck]",
               new {  },
               commandType: CommandType.StoredProcedure));
        }

        public PersonHealthCheck GetPersonHealthCheckById(int Id)
        {
            var personHealthCheck = new PersonHealthCheck();
            var result = Execute(connection => connection.QueryMultiple("[Hr].[GetPersonHealthCheckById]",
                new
                {
                    id = Id
                }, commandType: CommandType.StoredProcedure));

            personHealthCheck = result.ReadFirstOrDefault();
            personHealthCheck.PersonHealthStds = result.Read<PersonHealthStd>();

            return personHealthCheck;
        }

        public int UpdateHealthCheck(CreateAndUpdatePersonHealthCheckRequest request, int userId)
        {
            DataTable stds = new DataTable();
            stds = request.StandardIds.ConvertToDataTable();
            return Execute(connection => connection.Execute("[Hr].[UpdateHealthCheck]",
               new
               {
                   id = request.Id,
                   pid = request.Pid,
                   userId = userId,
                   stdIds = stds,
                   year = request.Year,
                   note = request.Note
               },
               commandType: System.Data.CommandType.StoredProcedure));
        }
    }
}
