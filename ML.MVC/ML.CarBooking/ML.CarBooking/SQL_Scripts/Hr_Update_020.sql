ALTER PROC [Hr].[GetAllDisctrictByCityId]  
@cityId INT  
AS  
BEGIN  
 SELECT * FROM [Hr].[MLocation] WHERE [Type] = 2 AND ((@cityId = 0 AND 1=1) OR (@cityId<>0 AND ParentId = @cityId))  
END  

GO

ALTER PROC [Hr].[GetPersonDependents]  
@pid INT  
AS  
BEGIN  
 SELECT * FROM [Hr].[PersonRelationship]  
 WHERE IsDead = 0 AND IsDependent = 1  AND PersonId = @pid
   
END  

GO

ALTER PROC [Hr].[GetPersonLanguages]
@pid INT
AS
BEGIN
	SELECT * FROM [Hr].[PersonLanguage] WHERE PersonId = @pid
END

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
 SELECT Id,WorkLicenseId AS WorkLisenceId,Duration, FromDate, ToDate, PersonId FROM [Hr].[PersonWorkLicense] WHERE PersonId = @id  
END  

Go

ALTER PROC [Hr].[GetPersonAccountBank]  
 @pid INT  
AS  
BEGIN  
 SELECT * FROM [Hr].[PersonBankAccount] WHERE PersonId = @pid AND IsDeleted = 0
END  
