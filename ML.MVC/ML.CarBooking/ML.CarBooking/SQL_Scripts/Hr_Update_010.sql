CREATE PROC [Hr].[CheckEmployeeCode]
@employeeCode nchar(10)
AS
BEGIN
	IF EXISTS (SELECT 1 FROM [Hr].[Person] WHERE EmpCode = @employeeCode)
	BEGIN
		SELECT 0 
	END
	ELSE
	BEGIN
		SELECT 1
	END
END

GO
  
 ALTER PROC [Hr].[CreateSimplePerson]  
 @firstName nvarchar(50),  
 @lastName nvarchar(150),  
 @userName varchar(30),  
 @gender int,
 @employeeCode nchar(10)  
 AS  
 BEGIN  
   
 DECLARE @password varchar(16) ='mailinh2019'  

 DECLARE @isMale BIT   
 IF @gender = 1  
 BEGIN  
 SET @isMale = 1  
 END  
 ELSE  
 BEGIN  
 SET @isMale = 0  
 END  

 INSERT INTO [Hr].[Person](FirstName, EmpCode, LastName, IsMale, Actived, IsDeleted)  
 VALUES (@firstName, @employeeCode, @lastName, @isMale, 1, 0)  
   
 DECLARE @newId int  
 SELECT @newId = @@IDENTITY  
   
 INSERT INTO [Hr].[PersonAccount] (UserName, PersonId, [PassWord], IsLocked)  
 VALUES (@userName, @newId, @password, 0 )   
  
 SELECT @newId AS Id  
  
 END  
  
Go
ALTER PROC [Hr].[GetAllPerson]  
 @pageSize int = 0,  
 @pageIndex int = 0  
 AS  
 BEGIN  
 SELECT DISTINCT  
 p.Id,  
 p.FirstName,  
 p.LastName,  
 p.DoB,  
 (SELECT TOP 1 [Address] FROM [Hr].[PersonAddress] WHERE PersonId = p.Id AND [Type] =1 AND IsDeleted =0 ) AS [Address],  
 (SELECT TOP 1 [Address] FROM [Hr].[PersonAddress] WHERE PersonId = p.Id AND [Type] =2 AND IsDeleted =0 ) AS ContactAddress,  
 (SELECT TOP 1 PhoneNumber FROM [Hr].[PersonPhone] WHERE PersonId = p.Id) AS PhoneNumber,  
 p.StartDate,  
 p.RoleId,    
 (SELECT TOP 1 ContractNumber FROM [Hr].[PersonContract] WHERE PersonId = p.id ORDER BY SignedIn DESC) AS ContractNumber,  
 (SELECT TOP 1 ContractNumber FROM [Hr].[PersonContract] WHERE PersonId = p.id ORDER BY SignedIn DESC) AS ContractDuration  
 FROM [Hr].[Person] p   
 WHERE p.IsDeleted = 0  
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
 phone.Id AS PhoneId ,  
 phone.PhoneNumber,  
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
 drive.SignedPlace AS DriveLicensePlace  
  
 FROM [Hr].[Person] p  
 JOIN [Hr].[PersonAccount] pa ON p.Id = pa.PersonId  
 LEFT JOIN [Hr].[PersonContract] pc ON p.Id = pc.PersonId  
 LEFT JOIN [Hr].[PersonEducation] edu ON p.Id = edu.PersonId  
 LEFT JOIN [Hr].[PersonDriveLicense] drive ON p.Id = drive.PersonId  
 LEFT JOIN [Hr].PersonPhone phone ON p.Id = phone.PersonId  
 LEFT JOIN [Hr].[PersonAddress] pa1 ON p.Id = pa1.PersonId AND pa1.[Type] =1  
 LEFT JOIN [Hr].[PersonAddress] pa2 ON p.Id = pa2.PersonId AND pa2.[Type] =2  
 WHERE p.Id = @id  
  
 SELECT Id,WorkLicenseId AS WorkLisenceId,Duration, FromDate, ToDate, PersonId FROM [Hr].[PersonWorkLicense] WHERE PersonId = @id  
  
 SELECT * FROM [Hr].[PersonLanguage] WHERE PersonId = @id   
END  
 GO 

