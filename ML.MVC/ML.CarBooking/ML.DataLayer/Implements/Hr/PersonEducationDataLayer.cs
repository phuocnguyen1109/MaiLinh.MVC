using Dapper;
using ML.Common.Data;
using ML.Common.Data.Interfaces;
using ML.Common.Data.Utilities;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities;
using ML.Entities.RequestModels.Hr;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Implements.Hr
{
    public class PersonEducationDataLayer : ConnectionBase, IPersonEducationDataLayer
    {
        public PersonEducationDataLayer(IConnectionFactory factory) : base(factory)
        { }
        public int CreateAndUpdateMDriveLicense(MDriveLicenseType request, int userId)
        {
            return Execute(connection =>
                            connection.Execute("[Hr].[CreateAndUpdateMDriveLicense]",
                            new
                            {
                                id = request.Id,
                                name = request.TypeName,
                                userId = userId
                            }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int CreateAndUpdateMLanguage(MLanguage request, int userId)
        {
            return Execute(connection =>
                             connection.Execute("[Hr].[CreateAndUpdateMLanguage]",
                             new
                             {
                                 id = request.Id,
                                 name = request.Name,
                                 userId = userId
                             }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int CreateAndUpdateMWorkLicense(MWorkLicense request, int userId)
        {
            return Execute(connection =>
                             connection.Execute("[Hr].[CreateAndUpdateMWorkLicense]",
                             new
                             {
                                 id = request.Id,
                                 name = request.Name,
                                 userId = userId
                             }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int CreateAndUpdatePersonEducation(CreateAndUpdatePersonEducationRequest request, int userId)
        {
            return Execute(connection =>
                              connection.Execute("[Hr].[CreateAndUpdatePersonEducation]",
                              new
                              {
                                  pid = request.PId,
                                  gradeId = request.GradeId,
                                  major = request.Major,
                                  driveTypeId = request.DriveTypeId,
                                  expiredOn = request.ExpiredOn,
                                  signedPlace = request.SignedPlace,
                                  userId = userId
                              }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int CreateAndUpdatePersonLanguage(PersonLanguage request, int userId)
        {
            return Execute(connection =>
                                connection.ExecuteScalar<int>("[Hr].[CreateAndUpdatePersonLanguage]",
                                new
                                {
                                    id = request.Id,
                                    pid = request.PersonId,
                                    languageId = request.LanguageId,
                                    level = request.Level,
                                    userId = userId
                                }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int CreateAndUpdatePersonWorkLicense(PersonWorkLicense request, int userId)
        {
            return Execute(connection =>
                               connection.Execute("[Hr].[CreateAndUpdatePersonWorkLicense]",
                               new
                               {
                                   id = request.Id,
                                   workLicenseId = request.WorkLisenceId,
                                   duration = request.Duration,
                                   fromDate = request.FromDate,
                                   toDate = request.ToDate,
                                   userId = userId
                               }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int DeleteMDriveLicense(IEnumerable<int> ids)
        {
            DataTable tblIds = new DataTable();
            tblIds = ids.ConvertToDataTable();
            return Execute(connection =>
                               connection.Execute("[Hr].[DeleteMDriveLicense]",
                               new
                               {
                                   ids = tblIds
                               }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int DeleteMLanguage(IEnumerable<int> ids)
        {
            DataTable tblIds = new DataTable();
            tblIds = ids.ConvertToDataTable();
            return Execute(connection =>
                               connection.Execute("[Hr].[DeleteMLanguage]",
                               new
                               {
                                   ids = tblIds
                               }, commandType: System.Data.CommandType.StoredProcedure));
        }


        public int DeleteMWorkLicense(IEnumerable<int> ids)
        {
            DataTable tblIds = new DataTable();
            tblIds = ids.ConvertToDataTable();
            return Execute(connection =>
                               connection.Execute("[Hr].[DeleteMWorkLicense]",
                               new
                               {
                                   ids = tblIds
                               }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int DeletePersonLanguage(IEnumerable<int> ids)
        {
            DataTable tblIds = new DataTable();
            tblIds = ids.ConvertToDataTable();
            return Execute(connection =>
                               connection.Execute("[Hr].[DeletePersonLanguage]",
                               new
                               {
                                   ids = tblIds
                               }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public MDriveLicenseType GetMDriveLicenseById(int id)
        {
            return Execute(connection =>
                               connection.Query<MDriveLicenseType>("[Hr].[MDriveLicenseType]",
                               new
                               {
                                   id = id
                               }, commandType: System.Data.CommandType.StoredProcedure)).FirstOrDefault();
        }

        public IEnumerable<MDriveLicenseType> GetMDriveLicenses()
        {
            return Execute(connection =>
                                connection.Query<MDriveLicenseType>("[Hr].[GetMDriveLicenseType]",
                                new{}, commandType: System.Data.CommandType.StoredProcedure));
        }

        public IEnumerable<PersonLanguage> GetPersonLanguages(int pid)
        {
            return Execute(connection =>
                               connection.Query<PersonLanguage>("[Hr].[GetPersonLanguages]",
                               new { pid = pid }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public MLanguage GetMLanguageById(int id)
        {
            return Execute(connection =>
                              connection.Query<MLanguage>("[Hr].[GetMLanguageById]",
                              new
                              {
                                  id = id
                              }, commandType: System.Data.CommandType.StoredProcedure)).FirstOrDefault();
        }

        public IEnumerable<MLanguage> GetMLanguages()
        {
            return Execute(connection =>
                              connection.Query<MLanguage>("[Hr].[GetMLanguages]",
                              new
                              {
                              }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public MWorkLicense GetMWorkLicenseById(int id)
        {
            return Execute(connection =>
                               connection.Query<MWorkLicense>("[Hr].[GetMWorkLicenseById]",
                               new
                               {
                                   id = id
                               }, commandType: System.Data.CommandType.StoredProcedure)).FirstOrDefault();
        }

        public IEnumerable<MWorkLicense> GetMWorkLicenses()
        {
            return Execute(connection =>
                             connection.Query<MWorkLicense>("[Hr].[GetMWorkLicense]",
                             new
                             {
                             }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public PersonEducation GetPersonEducation(int pid)
        {
            var personEdu = new PersonEducation();
            var result = Execute(connection => connection.QueryMultiple("[Hr].[GetPersonEducations]", new { id = pid }, commandType: CommandType.StoredProcedure));
            personEdu = result.ReadFirstOrDefault();
            personEdu.PersonDriveLicense = result.Read<PersonDriveLicense>().FirstOrDefault();
            personEdu.PersonWorkLicenses = result.Read<PersonWorkLicense>();

            return personEdu;
        }

        public int CreateOrUpdatePersonWorkLicense(PersonWorkLicense request, int userId)
        {
            return Execute(conection => conection.ExecuteScalar<int>("[Hr].[CreateOrUpdatePersonWorkLicense]",
                new {
                    workLicenseId = request.WorkLisenceId,
                    duration = request.Duration,
                    fromDate = request.FromDate,
                    toDate = request.ToDate,
                    issuePlace = request.IssuePlace,
                    personId = request.PersonId,
                    userId = userId
                }, commandType: CommandType.StoredProcedure));
        }

        public int DeletePersonLanguage(int id) {
            return Execute(conection => conection.ExecuteScalar<int>("[Hr].[DeletePersonLanguage]",
               new
               {
                  id = id
               }, commandType: CommandType.StoredProcedure));
        }
    }
}
