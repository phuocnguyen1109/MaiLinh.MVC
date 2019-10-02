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
using ML.Common.Data.Utilities;
using System.Data;

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

        public int CreatePersonContract(PersonContract request, int userId)
        {
            return Execute(connection => connection.Execute("[Hr].[CreatePersonContract]", 
                new {
                    pid = request.PersonId,
                    contractTypeId = request.ContractTypeId,
                    contractNumber = request.ContractNumber,
                    duration = request.Duration,
                    signedIn = request.SignedIn,
                    signedOut = request.SignOut,
                    userId = userId
                }, commandType:CommandType.StoredProcedure));
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
                    gender = request.Gender,
                    employeeCode = request.EmployeeCode
                }, commandType: System.Data.CommandType.StoredProcedure)); 
        }

        public int DeletePersonContract(int id, int userId)
        {
            return Execute(connection => connection.Execute("[Hr].[DeletePersonContract]",
                new
                {
                    id = id,
                    userId = userId
                }, commandType: CommandType.StoredProcedure));
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

        public IEnumerable<PersonAddress> GetPersonAddresses(int pid)
        {
            return Execute(connection => connection.Query<PersonAddress>("[Hr].[GetPersonAddress]",
              new { pid = pid }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public IEnumerable<PersonContract> GetPersonContracts(int pid)
        {
            return Execute(connection => connection.Query<PersonContract>("[Hr].[GetPersonContracts]",
                new
                {
                   pid = pid
                }, commandType: CommandType.StoredProcedure));
        }

        public IEnumerable<PersonIdentityCard> GetPersonIdentities(int pid)
        {
            return Execute(connection => connection.Query<PersonIdentityCard>("[Hr].[GetPersonIdentities]",
                 new { pid = pid }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public PersonResponse GetPersonInformation(int id)
        {
            PersonResponse response = new PersonResponse();
            return Execute(connection => {
                using (var result = connection.QueryMultiple("[Hr].[GetPersonInformation]",
                    new
                    {
                        id = id
                    }, 
                    commandType: System.Data.CommandType.StoredProcedure))
            {
                response = result.Read<PersonResponse>().FirstOrDefault();
                response.PersonWorkLicenses = result.Read<PersonWorkLicense>();
                response.PersonLanguages = result.Read<PersonLanguage>();
                return response;
                } 
            });
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

        public int UpdatePersonAddress(IEnumerable<PersonAddress> request, int userId)
        {
            DataTable tblAddress = request.ConvertToDataTable();
            return Execute(connection =>
            connection.Execute("[Hr].[UpdatePersonAddress]",
            new
            {
                addresstbl = tblAddress,
                userId = userId

            }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int UpdatePersonContract(PersonContract request, int userId)
        {
            return Execute(connection => connection.Execute("[Hr].[UpdatePersonContract]",
               new
               {
                   id = request.Id,
                   contractTypeId = request.ContractTypeId,
                   contractNumber = request.ContractNumber,
                   duration = request.Duration,
                   signedIn = request.SignedIn,
                   signedOut = request.SignOut,
                   userId = userId
               }, commandType: CommandType.StoredProcedure));
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

        public int UpdatePersonInformation(PersonResponse request, int userId)
        {
            return Execute(connection =>
            connection.Execute("[Hr].[UpdatePersonInformation]",
            new
            {
                pid = request.Id,
                fName =request.FirstName,
                lName = request.LastName,
                isMale = request.IsMale,
                dob = request.DoB,
                placeOfBirth = request.PlaceOfBirth,
                homeTownId = request.HomeTownId,
                religionId = request.ReligionId,
                nationId = request.NationId,
                countryId = request.CountryId,
                mlcDate = request.MLCDate,
                startDate = request.StartDate,
                deptId =request.DepartmentId,
                roleId = request.RoleId,
                isPension = request.IsPension,
                siNote = request.SINote,
                sINumber = request.SINumber,
                sIContractNUmber = request.SIContractNumber,
                major = request.Major,
                gradeId = request.GradeId,
                driveLicenseId = request.DriveLicenseId,
                signedPlace = request.DriveLicensePlace,
                expiredOn = request.DriveLicenseExpired

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

        public IEnumerable<PersonEquipment> GetPersonEquipments(int pid)
        {
            return Execute(connection => connection.Query<PersonEquipment>("[Hr].[GetPersonEquipments]",
                new
                {
                    pid = pid
                }, commandType: CommandType.StoredProcedure));
        }

        public int CreateOrUpdatePersonEquipment(PersonEquipment request)
        {
            return Execute(connection =>
           connection.Execute("[Hr].[CreateOrUpdatePersonEquipment]",
           new
           {
              pid = request.PersonId,
              receivedDate = request.ReceivedDate,
              equipmentId = request.Id
           }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int CheckEmployeeCode(string employeeCode)
        {
            return Execute(connection =>
           connection.ExecuteScalar<int>("[Hr].[CheckEmployeeCode]",
           new
           {
               employeeCode = employeeCode
           }, commandType: System.Data.CommandType.StoredProcedure));
        }
    }
}
