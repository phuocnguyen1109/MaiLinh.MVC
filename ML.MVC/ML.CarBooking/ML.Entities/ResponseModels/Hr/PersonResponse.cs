using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Entities.ResponseModels.Hr
{
    public class PersonResponse
    {
        public int Id { get; set; }
        public string EmpCode { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public bool IsMale { get; set; }
        public DateTime? DoB { get; set; }
        public int HomeTownId { get; set; }
        public int ReligionId { get; set; }
        public int NationId { get; set; }
        public int PlaceOfBirth { get; set; }
        public int CountryId { get; set; }
        public DateTime? MLCDate { get; set; }
        public DateTime? StartDate { get; set; }
        public int DepartmentId { get; set; }
        public int RoleId { get; set; }
        public int ContractTypeId { get; set; }
        public int SINumber { get; set; }
        public int SIContractNumber { get; set; }
        public bool IsPension { get; set; }
        public string SINote { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedOn {get; set;}
        public int UpdatedBy { get; set; }
        public int UpdatedOn { get; set; }
        public bool Actived { get; set; }
        public bool IsDeleted { get; set; }
        public int MariageStatus { get; set; }  
        public int GradeId { get; set; }
        public string Major { get; set; }
        public int DriveLicenseId { get; set; }
        public DateTime? DriveLicenseExpired { get; set; }
        public string DriveLicensePlace { get; set; }
        public IEnumerable<PersonAddress> Addresses { get; set; }

        public IEnumerable<PersonLanguage> PersonLanguages { get; set; }
        public IEnumerable<PersonWorkLicense> PersonWorkLicenses { get; set; }
    }

    public class PersonInformation
    {
        PersonResponse PersonInfo { get; set; }
    }

    public class PersonGridResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DoB { get; set; }
        public string Address { get; set; }
        public string ContactAddress { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime StartDate { get; set; }
        public string Role { get; set; }
        public string ContractNumber { get; set; }
        public int ContractDuration { get; set; }

    }
}
