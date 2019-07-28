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
using ML.Entities;

namespace ML.DataLayer.Implements.Hr
{
    public class PersonDataLayer : ConnectionBase, IPersonDataLayer
    {

        public PersonDataLayer(IConnectionFactory factory) : base(factory)
        {

        }

        public int AddPersonIdentity(PersonIdentityCard request, int userId = 1)
        {//TODO
            return Execute(connection =>
              connection.Execute("[Hr].[AddPersonIdentity]",
              new
              {
                  pid = request.PersonId,
                  date = request.DateReleased,
                  type = request.IdentityTypeId,
                  number = request.Number,
                  place = request.PlaceReleased
              }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int AddPersonPhone(PersonPhone request, int userId = 1)
        {
            return Execute(connection =>
                connection.Execute("[Hr].[AddPersonPhone]",
                new
                {
                    personId = request.PersonId,
                    number = request.PhoneNumber,
                    phoneType = request.PhoneType,
                    userId = userId
                }, commandType: System.Data.CommandType.StoredProcedure));
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

        public int DeletePersonIdentity(int id)
        {
            return Execute(connection =>
               connection.Execute("[Hr].[DeletePersonIdentity]",
               new
               {
                   id = id
               }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int DeletePersonPhone(int id)
        {
            return Execute(connection =>
               connection.Execute("[Hr].[DeletePersonPhone]",
               new
               {
                   id= id
               }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public IEnumerable<PersonGridResponse> GetAllPerson()
        {
            return Execute(connection => 
            connection.Query<PersonGridResponse>("[Hr].[GetAllPerson]", commandType: System.Data.CommandType.StoredProcedure));
        }

        public IEnumerable<PersonIdentityCard> GetPersonIdentities(int pid)
        {
            return Execute(connection => connection.Query<PersonIdentityCard>("[Hr].[GetPersonIdentities]",
                 new { pid = pid }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public PersonResponse GetPersonInformation(int id)
        {
            return Execute(connection =>
            connection.Query<PersonResponse>("[Hr].[GetPersonInformation]",
            new {
                id
            }, commandType: System.Data.CommandType.StoredProcedure)).FirstOrDefault();
        }

        public IEnumerable<PersonPhone> GetPersonPhones(int pid)
        {
            return Execute(connection => connection.Query<PersonPhone>("[Hr].[GetPersonPhones]",
                new { pid = pid }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public PersonResponse GetPersonSIContracts(int pid)
        {
            return Execute(connection => connection.Query<PersonResponse>("[Hr].[GetPersonSIContracts]",
                new
                {
                    pid = pid
                },
                commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault());
        }

        public int UpdatePersonIdentity(PersonIdentityCard request, int userId = 1)
        {//TODO
            return Execute(connection =>
             connection.Execute("[Hr].[UpdatePersonIdentity]",
             new
             {
                 id = request.Id,
                 type = request.IdentityTypeId,
                 place = request.PlaceReleased,
                 date = request.DateReleased,
                 number = request.Number

             }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int UpdatePersonPhone(PersonPhone request, int userId = 1)
        {
            return Execute(connection =>
               connection.Execute("[Hr].[UpdatePersonPhone]",
               new
               {
                   id = request.Id,
                   number = request.PhoneNumber,
                   phoneType = request.PhoneType,
                   userId = userId
               }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int UpdatePersonSIContract(PersonResponse request, int userId = 1)
        {
            return Execute(connection =>
              connection.Execute("[Hr].[UpdatePersonSIContract]",
              new
              {
                pid = request.Id,
                sINumber = request.SINumber,
                sIContractNumber = request.SIContractNumber,
                sINote = request.SINote
              }, commandType: System.Data.CommandType.StoredProcedure));
        }
    }
}
