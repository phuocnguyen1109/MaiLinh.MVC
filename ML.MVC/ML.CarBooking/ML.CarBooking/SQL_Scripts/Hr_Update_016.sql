ALTER TABLE Hr.Person
ADD [CooperationAmount] INT,
	[CooperationFirstPay] INT,
	[CooperationMinutePerMonth] INT
 
ALTER TABLE Hr.Person
ADD [SocialInsuranceCode] varchar(50),
	[SocialInsuranceSalaryJoin] int,
	[SocialInsurancePayPerMonth] INT,
	[TaxCode] varchar(50)

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
 SELECT * FROM [Hr].[PersonLanguage] WHERE PersonId = @id   
END  

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
@mariageStatus int,

@phoneNumber varchar(13),
@cooperationAmount int,
@cooperationFirstPay int,
@cooperationMinutePerMonth int,
@socialInsuranceCode varchar(50),
@socialInsuranceSalaryJoin int,
@socialInsurancePayPerMonth int,
@taxCode varchar(50)


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
	  ,[MariageStatus] = @mariageStatus

	  ,[PhoneNumber] = @phoneNumber
	  ,[CooperationAmount] = @cooperationAmount 
	  ,[CooperationFirstPay]= @cooperationFirstPay 
	  ,[CooperationMinutePerMonth] =@cooperationMinutePerMonth 
	   ,SocialInsuranceCode = @socialInsuranceCode
	  , SocialInsuranceSalaryJoin =@socialInsuranceSalaryJoin
	  , SocialInsurancePayPerMonth = @socialInsurancePayPerMonth 
	  , TaxCode = @taxCode



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
ALTER PROC [Hr].[DeletePersonBankAccount]

@id INT,

@userId INT

AS

BEGIN

	UPDATE [Hr].[PersonBankAccount]

	SET

		IsDeleted = 1,

		UpdatedBy = @userId,

		UpdatedOn = GETDATE()

	WHERE Id = @id

	SELECT @@ROWCOUNT

END

GO


CREATE PROC [Hr].[CreateOrUpdatePersonHealthInsurance]

@id int ,

@pid int,

@amount int,

@duration int,

@fromDate Datetime,

@toDate Datetime,

@userId int,

@isDeleted BIT 

AS

BEGIN

	IF @id =0 

	BEGIN 

		INSERT INTO Hr.PersonHealthInsurance (PersonId, Amount, Duration, FromDate, ToDate, CreatedBy, CreatedOn)

		VALUES ( @pid, @amount, @duration, @fromDate, @toDate, @userId, GETDATE())

		SELECT @@IDENTITY

	END

	ELSE

	BEGIN

		UPDATE Hr.PersonHealthInsurance 

		SET

			Amount = @amount,

			Duration = @duration,

			FromDate = @fromDate,

			ToDate= @toDate,

			IsDeleted = @isDeleted,

			UpdatedBy  = @userId,

			UpdatedOn = GETDATE()

		WHERE Id = @id

		SELECT @@ROWCOUNT

	END

END
 GO
ALTER PROC [Hr].[DeletePersonLifeInsurance]

@id int

as

begin

	delete from hr.PersonLifeInsurance where Id = @id
	SELECT @@ROWCOUNT

end

GO
ALTER PROC [Hr].[GetPersonContracts]

@pid INT

AS

BEGIN

	SELECT *

	FROM [Hr].[PersonContract] WHERE PersonId = @pid AND IsDeleted = 0

END

GO
ALTER PROC [Hr].[CreateAndUpdatePersonLanguage]

	@id INT,

	@pid INT,

	@languageId INT, 

	@level nvarchar(200),

	@userId INT

AS

BEGIN

	IF @id = 0

	BEGIN

		INSERT INTO [Hr].[PersonLanguage] (PersonId, LanguageId, [Level], CreatedBy, CreatedOn)

		VALUES (@pid, @languageId, @level, @userId, GETDATE())
		SELECT @@IDENTITY

	END

	ELSE

	BEGIN

		UPDATE [Hr].[PersonLanguage]

		SET

			LanguageId = @languageId,

			[Level] = @level,

			UpdatedBy = @userId,

			UpdatedOn = GETDATE()

		WHERE Id = @id
		SELECT @@ROWCOUNT

	END

END

GO
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

 p.PhoneNumber,

 p.StartDate,  

 p.RoleId,    

 (SELECT TOP 1 ContractNumber FROM [Hr].[PersonContract] WHERE PersonId = p.id AND IsDeleted =0 ORDER BY SignedIn DESC) AS ContractNumber,  

 (SELECT TOP 1 ContractNumber FROM [Hr].[PersonContract] WHERE PersonId = p.id AND IsDeleted = 0 ORDER BY SignedIn DESC) AS ContractDuration  

 FROM [Hr].[Person] p   

 WHERE p.IsDeleted = 0  

 END  

 

