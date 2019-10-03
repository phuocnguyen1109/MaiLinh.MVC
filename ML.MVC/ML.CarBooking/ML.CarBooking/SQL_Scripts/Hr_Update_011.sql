ALTER TABLE [Hr].[Person]
ADD PhoneNumber varchar(13)
GO
ALTER TABLE [Hr].[Person]
ADD Email varchar(100)

GO
ALTER PROC [Hr].[UpdatePersonInformation]



@pid INT,



@fName NVARCHAR(50),



@lName NVARCHAR(150),



@isMale Bit,



@dob DateTime,



@placeOfBirth INT,



@homeTownId int,



@religionId INT, 



@nationId INT,



@countryId INT,



@mlcDate DateTime,



@startDate datetime,



@deptId INT,



@roleId INT,



@isPension BIT,



@siNote ntext,



@sINumber int,



@sIContractNUmber int,

@major NVARCHAR(200),

@gradeId INT,

@driveLicenseId INT,

@signedPlace nvarchar(400),

@expiredOn DateTime,
@email varchar(100),
@phoneNumber varchar(13)



AS



BEGIN 



UPDATE [Hr].[Person]



   SET 
	   [FirstName] = @fName
      ,[LastName] = @lName
      ,[FullName] = @fName +' '+@lName
      ,[IsMale] = @isMale
      ,[DoB] = @dob
      ,[PlaceOfBirth] = @placeOfBirth
      ,[HomeTownId] = @homeTownId
      ,[ReligionId] = @religionId
      ,[NationId] = @nationId
      ,[CountryId] = @countryId
      ,[MLCDate] = @mlcDate
      ,[StartDate] = @startDate
      ,[DepartmentId] = @deptId
      ,[RoleId] = @roleId
      ,[SINumber] = @sINumber
      ,[SIContractNumber] = @sIContractNUmber
      ,[IsPension] = @isPension
      ,[SINote] = @siNote
	  ,[Email] = @email
	  ,[PhoneNumber] = @phoneNumber

 WHERE Id = @pid

 IF EXISTS (SELECT 1 FROM [Hr].[PersonEducation] WHERE PersonId = @pid)

 BEGIN 

 UPDATE [Hr].[PersonEducation]

 SET GradeId = @gradeId,

	 Major = @major

 Where PersonId = @pid

 END

 ELSE

 BEGIN

	INSERT INTO [Hr].[PersonEducation] (PersonId, GradeId, Major) VALUES (@pid, @gradeId, @major)

 END



 IF EXISTS (SELECT 1 FROM [Hr].[PersonDriveLicense] WHERE PersonId = @pid)

 BEGIN 

 UPDATE [Hr].[PersonDriveLicense]

 SET DriveLicenseId = @driveLicenseId,

	 ExpiredOn = @expiredOn,

	 SignedPlace = @signedPlace

 Where PersonId = @pid

 END

 ELSE

 BEGIN

	INSERT INTO [Hr].[PersonDriveLicense] (PersonId, DriveLicenseId, SignedPlace, ExpiredOn) VALUES (@pid, @driveLicenseId, @signedPlace, @expiredOn)

 END



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
 p.PhoneNumber  

  

 FROM [Hr].[Person] p  

 JOIN [Hr].[PersonAccount] pa ON p.Id = pa.PersonId  

 LEFT JOIN [Hr].[PersonContract] pc ON p.Id = pc.PersonId  

 LEFT JOIN [Hr].[PersonEducation] edu ON p.Id = edu.PersonId  

 LEFT JOIN [Hr].[PersonDriveLicense] drive ON p.Id = drive.PersonId  

 LEFT JOIN [Hr].[PersonAddress] pa1 ON p.Id = pa1.PersonId AND pa1.[Type] =1  

 LEFT JOIN [Hr].[PersonAddress] pa2 ON p.Id = pa2.PersonId AND pa2.[Type] =2  

 WHERE p.Id = @id  

  

 SELECT Id,WorkLicenseId AS WorkLisenceId,Duration, FromDate, ToDate, PersonId FROM [Hr].[PersonWorkLicense] WHERE PersonId = @id  

  

 SELECT * FROM [Hr].[PersonLanguage] WHERE PersonId = @id   

END  


