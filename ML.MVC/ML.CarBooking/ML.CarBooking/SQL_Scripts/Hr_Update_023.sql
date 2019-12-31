ALTER TABLE [Hr].[PersonWorkLicense]
ADD [IssuePlace] nvarchar(250)

GO

ALTER PROC [Hr].[GetPersonInformation]  

 @id INT  

AS   

BEGIN  

 SELECT  

 p.Id,  

 p.EmpCode,  

 pa.UserName,  

 p.FirstName,  

 p.LastName,  

 p.IsMale,  

 p.DoB,  

 p.PlaceOfBirth,  

 p.ContractTypeId,  

 p.HomeTownId,  

 p.MLCDate,  

 p.IsPension,  

 p.NationId,  

 p.StartDate,  

 p.ReligionId,  

 p.DepartmentId,  

 p.RoleId,  

 p.SIContractNumber,  

 p.SINote,  

 p.SINumber,  

 pc.Id AS ContractId,  

 pc.ContractTypeId,  

 pc.ContractNumber,  

 pc.Duration,  

 pc.SignedIn,  

 pa1.[Address],  

 pa1.Id AS AddessId,  



 pa1.CityId AS AddressCityId,  



 pa1.DistrictId AS AddressDistrictId,  



 pa1.[Address] AS ContractAddress,  



 pa1.Id AS ContractAddessId,  



 pa1.CityId AS ContractAddressCityId,  



 pa1.DistrictId AS ContractAddressDistrictId,  



 p.Actived,  



 p.MariageStatus,  



 edu.GradeId,  



 edu.Major,  



 drive.DriveLicenseId,  



 drive.ExpiredOn AS DriveLicenseExpired,  



 drive.SignedPlace AS DriveLicensePlace,



 p.Email,



 p.PhoneNumber,

 [CooperationAmount] ,

 [CooperationFirstPay] ,

 [CooperationMinutePerMonth],

 [SocialInsuranceCode],

 [SocialInsuranceSalaryJoin],

 [SocialInsurancePayPerMonth],

 [TaxCode] 



 FROM [Hr].[Person] p  



 JOIN [Hr].[PersonAccount] pa ON p.Id = pa.PersonId  



 LEFT JOIN [Hr].[PersonContract] pc ON p.Id = pc.PersonId  



 LEFT JOIN [Hr].[PersonEducation] edu ON p.Id = edu.PersonId  



 LEFT JOIN [Hr].[PersonDriveLicense] drive ON p.Id = drive.PersonId  



 LEFT JOIN [Hr].[PersonAddress] pa1 ON p.Id = pa1.PersonId AND pa1.[Type] =1  



 LEFT JOIN [Hr].[PersonAddress] pa2 ON p.Id = pa2.PersonId AND pa2.[Type] =2  

 WHERE p.Id = @id  

 SELECT Id,WorkLicenseId AS WorkLisenceId,Duration, FromDate, ToDate, IssuePlace, PersonId FROM [Hr].[PersonWorkLicense] WHERE PersonId = @id  

 SELECT * FROM [Hr].[PersonLanguage] WHERE PersonId = @id   

END  

GO

ALTER PROC [Hr].[CreateOrUpdatePersonWorkLicense]

@workLicenseId INT, 

@duration INT,

@fromDate DateTime,

@toDate DateTime,
@issuePlace NVARCHAR(250),

@personId INT,

@userId INT

AS

BEGIN

	IF EXISTS (SELECT 1 FROM [Hr].[PersonWorkLicense] WHERE PersonId = @personId AND WorkLicenseId = @workLicenseId)

	BEGIN

		UPDATE [Hr].[PersonWorkLicense]

		SET Duration = @duration,

			FromDate = @fromDate,

			ToDate = @toDate,

			IssuePlace = @issuePlace,

			UpdatedBy = @userId,

			UpdatedOn = GETDATE()

		WHERE WorkLicenseId = @workLicenseId AND PersonId = @personId

	END

	ELSE

	BEGIN

		INSERT INTO [Hr].[PersonWorkLicense] (WorkLicenseId, Duration, FromDate, ToDate, IssuePlace, PersonId, CreatedBy, CreatedOn)

		VALUES( @workLicenseId, @duration, @fromDate, @toDate, @issuePlace, @personId, @userId, GETDATE())

	END

	SELECT @@ROWCOUNT

END