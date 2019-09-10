using ML.Common.Data;
using ML.Common.Data.Interfaces;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace ML.DataLayer.Implements.Hr
{
    public class PersonMariageDataLayer : ConnectionBase, IPersonMariage
    {
        public PersonMariageDataLayer(IConnectionFactory factory) : base(factory)
        {

        }

        public int AddPersonRelationShip(PersonRelationShip request, int userId)
        {
            return Execute(connection =>
            connection.ExecuteScalar<int>("[Hr].[AddPersonRelationShip]",
            new { PersonId = request.PersonId,
                  FullName = request.FullName,
                  YearOfBirth = request.YearOfBirth,
                  IsDead = request.IsDead,
                  Address = request.Address,
                  RelationShipId = request.RelationShipId,
                  UserId = userId},
            commandType: System.Data.CommandType.StoredProcedure));
        }

        public int DeletePersonRelationShip(int relationId)
        {
            return Execute(connection =>
            connection.ExecuteScalar<int>("[Hr].[DeletePersonRelationShip]",
            new {Id = relationId },
            commandType: System.Data.CommandType.StoredProcedure));
        }

        public IEnumerable<MMariageStatus> GetMMariageStatus()
        {
            return Execute(connection => connection.Query<MMariageStatus>("[Hr].[GetMMariageStatus]", commandType: System.Data.CommandType.StoredProcedure));
        }

        public IEnumerable<PersonRelationShip> GetPersonRelationShips(int personId)
        {

            return Execute(connection => connection.Query<PersonRelationShip>("[Hr].[GetPersonRelationShip]", new { PersonId = personId }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int UpdatePersonRelationShip(PersonRelationShip request, int userId)
        {
            return Execute(connection =>
               connection.ExecuteScalar<int>("[Hr].[UpdatePersonRelationShip]",
               new
               {
                   Id = request.Id,
                   FullName = request.FullName,
                   YearOfBirth = request.YearOfBirth,
                   IsDead = request.IsDead,
                   Address = request.Address,
                   RelationShipId = request.RelationShipId,
                   UserId = userId
               },
               commandType: System.Data.CommandType.StoredProcedure));
        }
    }
}
