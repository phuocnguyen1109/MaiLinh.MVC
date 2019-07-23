CREATE PROC [Hr].[GetWorkingHistoryByUser]
@personId INT
AS
BEGIN
	SELECT * FROM Hr.PersonWorkHistory 
	WHERE PersonId = @personId
END

GO
CREATE PROC [Hr].[CreatePerson]
	@empCode nchar(10),
	@fName nvarchar(50),
	@lName nvarchar(150),
	@isMale bit,
	@dob DateTime,
	@homeTownId int,
	@religionId int,
	@nationId int, 
	@countryId int,
	@mlcDate Datetime,
	@startDate Datetime,
	@departmentId int,
	@roleId int,
	@contractTypeId int, 
	@siNumber int,
	@siContractNumber int,
	@isPension bit,
	@siNote ntext,
	@createdBy int
AS
BEGIN
	INSERT INTO [Hr].[Person]
           ([EmpCode]
           ,[FirstName]
           ,[LastName]
           ,[FullName]
           ,[IsMale]
           ,[DoB]
           ,[HomeTownId]
           ,[ReligionId]
           ,[NationId]
           ,[CountryId]
           ,[MLCDate]
           ,[StartDate]
           ,[DepartmentId]
           ,[RoleId]
           ,[ContractTypeId]
           ,[SINumber]
           ,[SIContractNumber]
           ,[IsPension]
           ,[SINote]
           ,[CreatedBy]
           ,[CreatedOn]
           ,[Actived]
           ,[IsDeleted])
     VALUES
           (@empCode
           ,@fName
           ,@lName
           ,@fName+' '+@lName
           ,@isMale
           ,@dob
           ,@homeTownId
           ,@religionId
           ,@nationId
           ,@countryId
           ,@mlcDate
           ,@startDate
           ,@departmentId
           ,@roleId
           ,@contractTypeId
           ,@siNumber
           ,@siContractNumber
           ,@isPension
           ,@siNote
           ,@createdBy
           ,GETDATE()
           ,1
           ,0)

END

GO
ALTER PROC [Hr].[GetAllPerson]
 @pageSize int = 0,
 @pageIndex int = 0
 AS
 BEGIN
	SELECT 
	p.Id,
	p.FirstName,
	p.LastName,
	p.DoB,
	a1.[Address],
	a2.[Address] AS ContactAddress,
	phone.PhoneNumber,
	p.StartDate,
	p.RoleId,
	'Tài Xế' AS [Role],
	pc.ContractNumber,
	pc.Duration AS ContractDuration

	FROM [Hr].[Person] p
	LEFT JOIN [Hr].[PersonAddress] a1 ON p.Id = a1.PersonId AND a1.isDeleted = 0 AND a1.[Type] =1
	LEFT JOIN [Hr].[PersonAddress] a2 ON p.Id = a2.PersonId AND a2.isDeleted = 0 AND a2.[Type] =2
	LEFT JOIN [Hr].[PersonPhone] phone ON p.id = phone.PersonId 
	LEFT JOIN [Hr].[PersonContract] pc ON p.Id = pc.PersonId
	WHERE p.IsDeleted = 0
 END
 
GO

 ALTER PROC [Hr].[CreateSimplePerson]
 @firstName nvarchar(50),
 @lastName nvarchar(150),
 @userName varchar(30),
 @gender int
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
 INSERT INTO [Hr].[Person](FirstName, LastName, IsMale, Actived, IsDeleted)
 VALUES (@firstName, @lastName, @isMale, 1, 0)
 
 DECLARE @newId int
 SELECT @newId = @@IDENTITY

 DECLARE @empCode varchar(10) = SUBSTRING (CONVERT(varchar(10),1000000 + @newId),2,6)
 UPDATE [Hr].[Person] SET EmpCode = @empCode WHERE Id = @newId
 
 INSERT INTO [Hr].[PersonAccount] (UserName, PersonId, [PassWord], IsLocked)
 VALUES (@userName, @newId, @password, 0 ) 

 SELECT @newId AS Id

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
	p.Actived
	 
	FROM [Hr].[Person] p
	JOIN [Hr].[PersonAccount] pa ON p.Id = pa.PersonId
	LEFT JOIN [Hr].[PersonContract] pc ON p.Id = pc.PersonId
	LEFT JOIN [Hr].PersonPhone phone ON p.Id = phone.PersonId
	LEFT JOIN [Hr].[PersonAddress] pa1 ON p.Id = pa1.PersonId AND pa1.[Type] =1
	LEFT JOIN [Hr].[PersonAddress] pa2 ON p.Id = pa2.PersonId AND pa2.[Type] =2
	WHERE p.Id = @id

END

exec [Hr].[GetPersonInformation] 7