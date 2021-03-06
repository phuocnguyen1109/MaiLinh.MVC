USE [ML]
GO
/****** Object:  Schema [Hr]    Script Date: 8/28/2019 9:00:07 AM ******/
CREATE SCHEMA [Hr]
GO
/****** Object:  UserDefinedTableType [dbo].[IdsTable]    Script Date: 8/28/2019 9:00:07 AM ******/
CREATE TYPE [dbo].[IdsTable] AS TABLE(
	[Id] [int] NULL
)
GO
/****** Object:  UserDefinedTableType [Hr].[PersonAddressTable]    Script Date: 8/28/2019 9:00:07 AM ******/
CREATE TYPE [Hr].[PersonAddressTable] AS TABLE(
	[PersonId] [int] NULL,
	[Type] [int] NULL,
	[Address] [nvarchar](400) NULL,
	[DistrictId] [int] NULL,
	[CityId] [int] NULL
)
GO
/****** Object:  StoredProcedure [Hr].[AddOrUpdateLocation]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[AddOrUpdateLocation]
@id INT,
@parentId INT,
@name nvarchar(400),
@type INT
AS
BEGIN
	IF @id = 0
	BEGIN
		INSERT INTO [Hr].[MLocation] (ParentId, [Name], [Type])
		VALUES (@parentId, @name, @type)
	END
	ELSE
	BEGIN
		UPDATE [Hr].[MLocation]
		SET ParentId = @parentId,
		Name = @name,
		[Type] = @type
		WHERE Id = @id
	END
END
GO
/****** Object:  StoredProcedure [Hr].[AddPersonIdentity]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[AddPersonIdentity]
@pid INT, 
@type INT,
@number varchar(20), 
@place nvarchar(1000),
@date Datetime
AS
BEGIN
	INSERT INTO [Hr].[PersonIdentity] (PersonId, Number, IdentityTypeId, PlaceReleased, DateReleased)
	VALUES(@pid, @number, @type, @place, @date)
END
GO
/****** Object:  StoredProcedure [Hr].[AddPersonPhone]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[AddPersonPhone]
@personId INT,
@number INT,
@phoneType INT,
@userId INT
AS
BEGIN
	INSERT INTO [Hr].[PersonPhone] (PersonId, PhoneNumber, PhoneType, CreatedBy, CreatedOn)
	VALUES(@personId, @number, @phoneType, @userId, GETDATE())
END
GO
/****** Object:  StoredProcedure [Hr].[CreateAndUpdateMDriveLicenseType]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[CreateAndUpdateMDriveLicenseType]
 @id INT, 
 @name VARCHAR(100),
 @userId INT
 AS 
 BEGIN
	IF @id = 0
	BEGIN
		INSERT INTO [Hr].[MDriveLicenseType] ([TypeName], CreatedBy, CreatedOn) 
		VALUES (@name, @userId, GETDATE())
	END
	ELSE
	BEGIN
	UPDATE [Hr].[MDriveLicenseType]
		SET [TypeName] = @name,
			UpdatedBy = @userId,
			UpdatedOn = GETDATE()
		WHERE Id = @id
	END
 END

 

GO
/****** Object:  StoredProcedure [Hr].[CreateAndUpdateMHealthCheck]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[CreateAndUpdateMHealthCheck]
@id INT,
@name NVARCHAR(200),
@userId INT
AS
BEGIN
	IF @id = 0
	BEGIN
		INSERT INTO [Hr].[MHealthStd] (Name, CreatedBy, CreatedOn)
		VALUES (@name, @userId, GETDATE())
	END
	ELSE
	BEGIN
		UPDATE [Hr].[MHealthStd]
		SET Name = @name,
			UpdatedBy = @userId,
			UpdatedOn = GETDATE()
		WHERE Id = @id
	END
END
GO
/****** Object:  StoredProcedure [Hr].[CreateAndUpdateMLanguage]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[CreateAndUpdateMLanguage]
 @id INT, 
 @name VARCHAR(100),
 @userId INT
 AS 
 BEGIN
	IF @id = 0
	BEGIN
		INSERT INTO [Hr].[MLanguage] ([Name], CreatedBy, CreatedOn) 
		VALUES (@name, @userId, GETDATE())
	END
	ELSE
	BEGIN
	UPDATE [Hr].[MLanguage]
		SET [Name] = @name,
			UpdatedBy = @userId,
			UpdatedOn = GETDATE()
		WHERE Id = @id
	END
 END

 

GO
/****** Object:  StoredProcedure [Hr].[CreateAndUpdateMWorkLicense]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[CreateAndUpdateMWorkLicense]
 @id INT, 
 @name VARCHAR(100),
 @userId INT
 AS 
 BEGIN
	IF @id = 0
	BEGIN
		INSERT INTO [Hr].[MWorkLicense] ([Name], CreatedBy, CreatedDate) 
		VALUES (@name, @userId, GETDATE())
	END
	ELSE
	BEGIN
	UPDATE [Hr].[MWorkLicense]
		SET [Name] = @name,
			UpdatedBy = @userId,
			UpdatedDate = GETDATE()
		WHERE Id = @id
	END
 END

 

GO
/****** Object:  StoredProcedure [Hr].[CreateAndUpdatePersonEducation]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [Hr].[CreateAndUpdatePersonEducation]
@pid INT, 
@gradeId INT, 
@major NVARCHAR(200),
@driveTypeId INT, 
@expiredOn DateTime,
@signedPlace NVARCHAR(400),
@userId INT
AS
BEGIN

DECLARE @eduId INT , @driveLicenseId INT
SELECT @eduId = ISNULL(Id,0) FROM [Hr].[PersonEducation] WHERE PersonId = @pid
SELECT @driveLicenseId = ISNULL(Id,0) FROM [Hr].[PersonDriveLicense] WHERE PersonId = @pid

IF @eduId = 0
BEGIN 
	INSERT INTO [Hr].[PersonEducation] (PersonId, GradeId, Major, CreatedBy, CreatedOn)
	VALUES (@pid, @gradeId, @major, @userId, GETDATE())
END
ELSE
BEGIN
	UPDATE [Hr].[PersonEducation] 
	SET GradeId = @gradeId,
		Major = @major,
		UpdatedBy = @userId,
		UpdatedOn = GETDATE()
	WHERE Id = @eduId
END

IF @driveLicenseId = 0
BEGIN
	INSERT INTO [Hr].[PersonDriveLicense](PersonId, DriveLicenseId, ExpiredOn, SignedPlace, CreatedBy, CreatedOn)
	VALUES (@pid, @driveTypeId, @expiredOn, @signedPlace, @userId, GETDATE())
END
ELSE
BEGIN
	UPDATE [Hr].[PersonDriveLicense]
	SET DriveLicenseId = @driveTypeId,
	ExpiredOn = @expiredOn,
	SignedPlace = @signedPlace,
	UpdatedBy = @userId,
	UpdatedOn = GETDATE()
END 
END


GO
/****** Object:  StoredProcedure [Hr].[CreateAndUpdatePersonLanguage]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[CreateAndUpdatePersonLanguage]
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
	END
END
GO
/****** Object:  StoredProcedure [Hr].[CreateAndUpdatePersonWorkLicense]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[CreateAndUpdatePersonWorkLicense]
@pid INT, 
@workLicenseId INT, 
@duration INT,
@fromDate DateTime,
@toDate DateTime,
@userId INT
AS
BEGIN
DECLARE @id INT
SELECT @id=ISNULL(Id,0) FROM [Hr].[PersonWorkLicense] WHERE PersonId = @pid AND WorkLicenseId = @workLicenseId

IF @id = 0 
BEGIN
	INSERT INTO [Hr].[PersonWorkLicense] (WorkLicenseId, PersonId, Duration, FromDate, ToDate, CreatedBy, CreatedOn)
	VALUES (@workLicenseId, @pid, @duration, @fromDate, @toDate, @userId, GETDATE())
END
ELSE
BEGIN
	UPDATE [Hr].[PersonWorkLicense]
	SET Duration = @duration, FromDate = @fromDate , ToDate = @toDate , UpdatedBy =@userId, UpdatedOn = GETDATE()
END

END

GO
/****** Object:  StoredProcedure [Hr].[CreateOrUpDateWorkHistory]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[CreateOrUpDateWorkHistory]
@id INT,
@pid INT,
@fromDate DateTime,
@toDate Datetime,
@CompanyName nvarchar(400),
@userId INT
AS
BEGIN
	IF (@id = 0) 
	BEGIN
		INSERT INTO [Hr].[PersonWorkHistory] (PersonId, FromDate, ToDate, CompanyName, CreatedBy, CreatedOn)
		VALUES (@pid, @fromDate, @toDate, @CompanyName, @userId, GETDATE())

	END
	ELSE
	BEGIN
		UPDATE [Hr].[PersonWorkHistory]
		SET FromDate = @fromDate,
			ToDate = @toDate,
			CompanyName = @CompanyName,
			UpdatedBy = @userId,
			UpdatedOn = GETDATE()
		WHERE Id = @id
	END

	SELECT @@ROWCOUNT AS RESULT
END
GO
/****** Object:  StoredProcedure [Hr].[CreatePerson]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
/****** Object:  StoredProcedure [Hr].[CreatePersonContract]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[CreatePersonContract]
@pid INT,
@contractTypeId INT,
@contractNumber INT,
@duration INT,
@signedIn DateTime,
@signedOut DateTime,
@userId INT
AS
BEGIN
	INSERT INTO [Hr].[PersonContract] (PersonId, ContractTypeId, ContractNumber, Duration, SignedIn, SignOut, CreatedBy, CreatedOn, IsDeleted)
	VALUES (@pid, @contractTypeId, @contractNumber, @duration, @signedIn, @signedOut, @userId, GETDATE(), 0)
END 
GO
/****** Object:  StoredProcedure [Hr].[CreatePersonHealthCheck]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[CreatePersonHealthCheck]
@pid INT,
@userId INT, 
@stdIds IdsTable READONLY, 
@year INT, 
@note NVARCHAR(4000)
AS
BEGIN
	DECLARE @id INT
	SELECT @id = ISNULL(Id, 0) FROM [Hr].[PersonHealthCheck] WHERE [Year] = @year AND PersonId = @pid


	

	IF @id = 0
	BEGIN
		INSERT INTO [Hr].[PersonHealthCheck] (PersonId, [Year], Note, CreatedBy, CreatedOn)
		VALUES (@pid, @year, @note, @userId, GETDATE())

		SELECT @id = @@IDENTITY

		INSERT INTO [Hr].[PersonHealthStd](HealthStdId, PersonHealthCheckId, CreatedBy, CreatedOn)
		SELECT Id, @id, @userId, GETDATE()
		FROM @stdIds
	END
	ELSE
	BEGIN
		EXEC [Hr].[UpdateHealthCheck] @pid, @id, @userId, @stdIds, @year, @note
	END

END
GO
/****** Object:  StoredProcedure [Hr].[CreateSimplePerson]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 CREATE PROC [Hr].[CreateSimplePerson]
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
/****** Object:  StoredProcedure [Hr].[DeleteHealthCheck]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[DeleteHealthCheck]
@ids IdsTable READONLY
AS
BEGIN
	DELETE FROM [Hr].[PersonHealthStd] WHERE PersonHealthCheckId IN (SELECT Id FROM @ids)
	DELETE FROM [Hr].[PersonHealthCheck] WHERE Id IN (SELECT Id FROM @ids)
END
GO
/****** Object:  StoredProcedure [Hr].[DeleteLocation]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[DeleteLocation]
@ids IdsTable READONLY
AS
BEGIN
	DELETE FROM [Hr].[MLocation] WHERE Id IN (SELECT Id FROM @ids)
END
GO
/****** Object:  StoredProcedure [Hr].[DeleteMDriveLicenseType]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[DeleteMDriveLicenseType]
@ids IdsTable READONLY
AS
BEGIN
	DELETE FROM [Hr].[MDriveLicenseType] WHERE Id IN (SELECT Id FROM @ids)	
END


GO
/****** Object:  StoredProcedure [Hr].[DeleteMHealthCheck]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[DeleteMHealthCheck]
@ids IdsTable READONLY
AS
BEGIN
	DELETE FROM [Hr].[MHealthStd] WHERE Id IN (SELECT Id FROM @ids)

END

GO
/****** Object:  StoredProcedure [Hr].[DeleteMLanguage]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[DeleteMLanguage]
@ids IdsTable READONLY
AS
BEGIN
	DELETE FROM [Hr].[MLanguage] WHERE Id IN (SELECT Id FROM @ids)	
END


GO
/****** Object:  StoredProcedure [Hr].[DeleteMWorkLicense]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[DeleteMWorkLicense]
@ids IdsTable READONLY
AS
BEGIN
	DELETE FROM [Hr].[MWorkLicense] WHERE Id IN (SELECT Id FROM @ids)	
END


GO
/****** Object:  StoredProcedure [Hr].[DeletePersonContract]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[DeletePersonContract]
@id INT,
@userId INT
AS
BEGIN
	UPDATE [Hr].[PersonContract]
	SET IsDeleted = 1, UpdatedBy= @userId, UpdatedOn = GETDATE()
	WHERE Id = @id
END
GO
/****** Object:  StoredProcedure [Hr].[DeletePersonIdentity]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [Hr].[DeletePersonIdentity]
@id INT
AS
BEGIN

Delete FROM [Hr].[PersonIdentity] WHERE Id = @id
END

GO
/****** Object:  StoredProcedure [Hr].[DeletePersonLanguage]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [Hr].[DeletePersonLanguage]
	@id INT
AS
BEGIN
	DELETE FROM [Hr].[PersonLanguage] WHERE Id = @id
END


GO
/****** Object:  StoredProcedure [Hr].[DeletePersonPhone]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[DeletePersonPhone]
@id INT
AS
BEGIN
	DELETE FROM [Hr].[PersonPhone] WHERE Id =@id
END
GO
/****** Object:  StoredProcedure [Hr].[DeleteWorkHistory]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[DeleteWorkHistory]
@id INT
AS
BEGIN
	DELETE FROM [Hr].[PersonWorkHistory] WHERE Id =@id
END
GO
/****** Object:  StoredProcedure [Hr].[GetAllCity]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetAllCity]
AS
BEGIN
	SELECT * FROM [Hr].[MLocation] WHERE [Type]= 1
END
GO
/****** Object:  StoredProcedure [Hr].[GetAllDisctrictByCityId]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetAllDisctrictByCityId]
@cityId INT
AS
BEGIN
	SELECT * FROM [Hr].[MLocation] WHERE [Type] = 2 AND  ParentId = @cityId
END
GO
/****** Object:  StoredProcedure [Hr].[GetAllLocation]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetAllLocation]
@type INT =0,
@parentId INT = 0
AS
BEGIN
	IF ISNULL(@type,-1)= -1
	BEGIN
	--Get Country
	SELECT * FROM [Hr].[MLocation] WHERE [Type] = 0

	--Get City
	SELECT * FROM [Hr].[MLocation] WHERE [Type] = 1

	--Get District
	SELECT * FROM [Hr].[MLocation] WHERE [Type] = 2
	
	END
	ELSE
	BEGIN
	SELECT * FROM [Hr].[MLocation] WHERE [Type] = @type AND ParentId = @parentId
	END
END
GO
/****** Object:  StoredProcedure [Hr].[GetAllPerson]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetAllPerson]

 @pageSize int = 0,

 @pageIndex int = 0

 AS

 BEGIN

	SELECT DISTINCT

	p.Id,

	p.FirstName,

	p.LastName,

	p.DoB,

	a1.[Address],

	a2.[Address] AS ContactAddress,

	(SELECT TOP 1 PhoneNumber FROM [Hr].[PersonPhone] WHERE PersonId = p.Id) AS PhoneNumber,

	p.StartDate,

	p.RoleId,

	'Tài Xế' AS [Role],
	(SELECT TOP 1 ContractNumber FROM [Hr].[PersonContract] WHERE PersonId = p.id ORDER BY SignedIn DESC) AS ContractNumber,
	(SELECT TOP 1 ContractNumber FROM [Hr].[PersonContract] WHERE PersonId = p.id ORDER BY SignedIn DESC) AS ContractDuration



	FROM [Hr].[Person] p

	LEFT JOIN [Hr].[PersonAddress] a1 ON p.Id = a1.PersonId AND a1.isDeleted = 0 AND a1.[Type] =1

	LEFT JOIN [Hr].[PersonAddress] a2 ON p.Id = a2.PersonId AND a2.isDeleted = 0 AND a2.[Type] =2

	WHERE p.IsDeleted = 0

 END

GO
/****** Object:  StoredProcedure [Hr].[GetHealthCheckByPerson]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetHealthCheckByPerson]
@pid INT
AS
BEGIN
	SELECT 
	phc.Id,
	phc.PersonId,
	phc.[Year],
	STUFF((SELECT ', ' + mhs.Name 
          FROM [Hr].[PersonHealthStd] phs
			JOIN [Hr].[MHealthStd] mhs ON phs.HealthStdId = mhs.Id
			WHERE phs.PersonHealthCheckId =phc.Id
			FOR XML PATH('')), 1, 1, '') AS [StandardName],
	phc.Note
	 FROM [Hr].[PersonHealthCheck] phc
	 WHERE phc.PersonId = @pid
	 Order By phc.[Year] ASC
END
GO
/****** Object:  StoredProcedure [Hr].[GetMDriveLicenseById]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetMDriveLicenseById]
	@id INT
AS
BEGIN
	SELECT * FROM [Hr].[MDriveLicenseType] WHERE Id = @id
END


GO
/****** Object:  StoredProcedure [Hr].[GetMDriveLicenseType]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--MWorkDriveLicense
CREATE PROC [Hr].[GetMDriveLicenseType]
AS
BEGIN
	SELECT * FROM [Hr].[MDriveLicenseType]
END


GO
/****** Object:  StoredProcedure [Hr].[GetMHealthCheck]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetMHealthCheck]
AS
BEGIN
	SELECT * FROM [Hr].[MHealthStd]
END
GO
/****** Object:  StoredProcedure [Hr].[GetMLanguage]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetMLanguage]
AS
BEGIN
	SELECT * FROM [Hr].[MLanguage]
END


GO
/****** Object:  StoredProcedure [Hr].[GetMlanguageById]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetMlanguageById]
	@id INT
AS
BEGIN
	SELECT * FROM [Hr].[MLanguage] WHERE Id = @id
END

GO
/****** Object:  StoredProcedure [Hr].[GetMMariageStatus]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetMMariageStatus]
AS
BEGIN
	SELECT * FROM Hr.MMariageStatus
	
END
GO
/****** Object:  StoredProcedure [Hr].[GetMWorkLicense]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- MWorkLicense
CREATE PROC [Hr].[GetMWorkLicense]
AS
BEGIN
	SELECT * FROM [Hr].[MWorkLicense]
END


GO
/****** Object:  StoredProcedure [Hr].[GetMWorkLicenseById]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetMWorkLicenseById]
	@id INT
AS
BEGIN
	SELECT * FROM [Hr].[MWorkLicense] WHERE Id = @id
END


GO
/****** Object:  StoredProcedure [Hr].[GetPagesWorkHistory]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetPagesWorkHistory]
@pid INT
AS
BEGIN
SELECT * FROM [Hr].[PersonWorkHistory]
END
GO
/****** Object:  StoredProcedure [Hr].[GetPersonAddress]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetPersonAddress]
@pid INT
AS
BEGIN
	SELECT * FROM [Hr].[PersonAddress] WHERE PersonId = @pid AND IsDeleted = 0
END
GO
/****** Object:  StoredProcedure [Hr].[GetPersonContracts]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetPersonContracts]
@pid INT
AS
BEGIN
	SELECT *
	FROM [Hr].[PersonContract] WHERE PersonId = @pid
END
GO
/****** Object:  StoredProcedure [Hr].[GetPersonEducation]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROC [Hr].[GetPersonEducation]
	@pid INT
AS
BEGIN
	SELECT * FROM [Hr].[PersonEducation] WHERE PersonId = @pid

	SELECT * FROM [Hr].[PersonDriveLicense] WHERE PersonId = @pid

	SELECT * FROM [Hr].[PersonLanguage] WHERE PersonId = @pid

	SELECT * FROM [Hr].[PersonWorkLicense] WHERE PersonId = @pid
END 

GO
/****** Object:  StoredProcedure [Hr].[GetPersonHealthCheckById]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetPersonHealthCheckById]
@id INT
AS
BEGIN
SELECT * FROM [Hr].[PersonHealthCheck] WHERE Id = @id
SELECT * FROM [Hr].[PersonHealthStd] WHERE PersonHealthCheckId = @id

END
GO
/****** Object:  StoredProcedure [Hr].[GetPersonIdentities]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [Hr].[GetPersonIdentities]
@pid INT
AS
BEGIN
	SELECT *
	FROM [Hr].[PersonIdentity]
	WHERE PersonId = @pid
END


GO
/****** Object:  StoredProcedure [Hr].[GetPersonInfo]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetPersonInfo]
@pid INT
AS
BEGIN
SELECT * FROM [Hr].[Person] WHERE Id = @pid
END
GO
/****** Object:  StoredProcedure [Hr].[GetPersonInformation]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [Hr].[GetPersonInformation]
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


GO
/****** Object:  StoredProcedure [Hr].[GetPersonPhones]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetPersonPhones]
@pid INT
AS
BEGIN
SELECT phone.Id, phone.PhoneNumber, phone.PhoneType, (p.FirstName + ' '+ p.LastName) AS CreatedBy, phone.CreatedOn, (p2.FirstName + ' '+ p2.LastName) AS UpdatedBy, phone.UpdatedOn  
FROM [Hr].[PersonPhone] phone
LEFT JOIN [Hr].[Person] p ON phone.CreatedBy = p.Id
LEFT JOIN [Hr].[Person] p2 ON phone.UpdatedBy = p2.Id 
WHERE PersonId = @pid
END
GO
/****** Object:  StoredProcedure [Hr].[GetPersonSIContracts]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetPersonSIContracts]
@pid INT 
AS
BEGIN
	SELECT SIContractNumber, SINumber, SINote FROM [Hr].Person WHERE Id =@pid
END
GO
/****** Object:  StoredProcedure [Hr].[GetWorkHistoryById]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetWorkHistoryById]
@id INT
AS
BEGIN
	SELECT * FROM [Hr].[PersonWorkHistory] WHERE Id =@id
END
GO
/****** Object:  StoredProcedure [Hr].[GetWorkingHistoryByUser]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[GetWorkingHistoryByUser]
@personId INT
AS
BEGIN
	SELECT * FROM Hr.PersonWorkHistory 
	WHERE PersonId = @personId
END


GO
/****** Object:  StoredProcedure [Hr].[UpdateHealthCheck]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[UpdateHealthCheck]
@pid INT,
@id INT,
@userId INT, 
@stdIds IdsTable READONLY, 
@year INT, 
@note NVARCHAR(4000)
AS
BEGIN
	UPDATE [Hr].[PersonHealthCheck]
	SET 
		[Year] = @year,
		Note = @note,
		UpdatedBy = @userId,
		UpdatedOn = GETDATE()
	WHERE Id = @id

	DELETE FROM [Hr].[PersonHealthStd] WHERE PersonHealthCheckId = @id

	INSERT INTO [Hr].[PersonHealthStd](HealthStdId, PersonHealthCheckId, CreatedBy, CreatedOn)
		SELECT Id, @id, @userId, GETDATE()
		FROM @stdIds
END
GO
/****** Object:  StoredProcedure [Hr].[UpdatePersonAddress]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[UpdatePersonAddress]
@addresstbl [Hr].[PersonAddressTable] READONLY,
@userId INT
AS
BEGIN
DECLARE @personId INT
DELETE FROM [Hr].[PersonAddress] WHERE PersonId IN (SELECT PersonId FROM @addresstbl)

INSERT INTO [Hr].[PersonAddress](PersonId, [Type], [Address], CityId, DistrictId, CreatedBy, CreatedOn, IsDeleted)
SELECT PersonId, [Type], [Address], CityId, DistrictId, @userId, GETDATE(), 0
FROM @addresstbl
END
GO
/****** Object:  StoredProcedure [Hr].[UpdatePersonContract]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[UpdatePersonContract]
@id INT,
@contractTypeId INT,
@contractNumber INT,
@duration INT,
@signedIn DateTime,
@signedOut DateTime,
@userId INT
AS
BEGIN
	UPDATE [Hr].[PersonContract]
	SET ContractTypeId = @contractTypeId,
		ContractNumber = @contractNumber,
		Duration = @duration,
		SignedIn = @signedIn,
		SignOut = @signedOut,
		UpdatedBy = @userId,
		UpdatedOn = GETDATE()
	WHERE Id = @id
END 
GO
/****** Object:  StoredProcedure [Hr].[UpdatePersonIdentity]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[UpdatePersonIdentity]
@id INT,
@type int,
@place nvarchar(1000),
@date datetime,
@number varchar(20)
AS
BEGIN
	UPDATE [Hr].[PersonIdentity]
	SET IdentityTypeId = @type,
	PlaceReleased = @place,
	DateReleased = @date,
	Number = @number
	WHERE Id = @id

END
GO
/****** Object:  StoredProcedure [Hr].[UpdatePersonInformation]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[UpdatePersonInformation]
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
@sIContractNUmber int
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
     
 WHERE Id = @pid
END

GO
/****** Object:  StoredProcedure [Hr].[UpdatePersonPhone]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[UpdatePersonPhone]
@id INT, 
@number VARCHAR(13),
@phoneType INT, 
@userId INT
AS
BEGIN
	UPDATE [Hr].[PersonPhone]
	SET PhoneNumber = @number,
	PhoneType = @phoneType,
	UpdatedBy = @userId,
	UpdatedOn = GETDATE()
	WHERE Id = @id

END
GO
/****** Object:  StoredProcedure [Hr].[UpdatePersonSIContract]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Hr].[UpdatePersonSIContract]
@pid INT,
@sINumber INT,
@sIContractNumber INT,
@sINote ntext
AS
BEGIN
UPDATE [Hr].[Person]
SET SIContractNumber = @sIContractNumber,
SINumber = @sINumber,
SINote = @sINote
WHERE Id = @pid
END
GO
/****** Object:  Table [Hr].[MContractType]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[MContractType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[Description] [nvarchar](1000) NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedBy] [int] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_MContractType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[MDriveLicenseType]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[MDriveLicenseType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TypeName] [nvarchar](100) NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [date] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_MDriveLicenseType_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[MEquipment]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[MEquipment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_MEquipment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[MGrade]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[MGrade](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[GradeName] [nvarchar](200) NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_MGrade] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[MHealthStd]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[MHealthStd](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_MHealthStd] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[MIdentityType]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[MIdentityType](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[IsDeleted] [bit] NULL,
	[Description] [nvarchar](1000) NULL,
 CONSTRAINT [PK_MIdentityType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[MLanguage]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[MLanguage](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_MLanguage] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[MLocation]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[MLocation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ParentId] [int] NULL,
	[Name] [nvarchar](200) NULL,
	[Type] [int] NOT NULL,
 CONSTRAINT [PK_MLocation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[MLocationType]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[MLocationType](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](100) NULL,
 CONSTRAINT [PK_MLocationType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[MMariageStatus]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[MMariageStatus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[CreatedIn] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedIn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
 CONSTRAINT [PK_MMariageStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[MMasterData]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[MMasterData](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TypeId] [int] NULL,
	[Name] [nvarchar](400) NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_MMasterData] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[MRelationshipType]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[MRelationshipType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_MRelationshipType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[MWorkLicense]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[MWorkLicense](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_MWorkLicense] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[Person]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [Hr].[Person](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EmpCode] [nchar](10) NULL,
	[UserName] [varchar](50) NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](150) NULL,
	[FullName] [nvarchar](200) NULL,
	[IsMale] [bit] NULL,
	[DoB] [datetime] NULL,
	[PlaceOfBirth] [int] NULL,
	[HomeTownId] [int] NULL,
	[ReligionId] [int] NULL,
	[NationId] [int] NULL,
	[CountryId] [int] NULL,
	[MLCDate] [datetime] NULL,
	[StartDate] [datetime] NULL,
	[DepartmentId] [int] NULL,
	[RoleId] [int] NULL,
	[ContractTypeId] [int] NULL,
	[SINumber] [int] NULL,
	[SIContractNumber] [int] NULL,
	[IsPension] [bit] NULL,
	[SINote] [ntext] NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[Actived] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_Person] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [Hr].[PersonAccount]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [Hr].[PersonAccount](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](30) NOT NULL,
	[PassWord] [varchar](16) NOT NULL,
	[PersonId] [int] NOT NULL,
	[IsLocked] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
 CONSTRAINT [PK_PersonAccount] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [Hr].[PersonAddress]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[PersonAddress](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NULL,
	[Type] [int] NULL,
	[Address] [nvarchar](300) NULL,
	[CityId] [int] NULL,
	[DistrictId] [int] NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_PersonAddress] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[PersonContract]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[PersonContract](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NULL,
	[ContractTypeId] [int] NULL,
	[ContractNumber] [int] NULL,
	[Duration] [int] NULL,
	[SignedIn] [datetime] NULL,
	[SignOut] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_PersonContract] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[PersonDriveLicense]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[PersonDriveLicense](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[DriveLicenseId] [int] NOT NULL,
	[ExpiredOn] [datetime] NULL,
	[SignedPlace] [nvarchar](400) NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
 CONSTRAINT [PK_PersonDriveLicense] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[PersonEducation]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[PersonEducation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[GradeId] [int] NOT NULL,
	[Major] [nvarchar](200) NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_Education] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[PersonEquipment]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[PersonEquipment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EquipmentId] [int] NULL,
	[ReceivedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_PersonEquipment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[PersonHealthCheck]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[PersonHealthCheck](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Year] [int] NULL,
	[Note] [nvarchar](4000) NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[PersonId] [int] NULL,
 CONSTRAINT [PK_PersonHealthCheck] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[PersonHealthStd]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[PersonHealthStd](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[HealthStdId] [int] NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedIn] [int] NULL,
	[PersonHealthCheckId] [int] NULL,
 CONSTRAINT [PK_PersonHealthStd] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[PersonIdentity]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [Hr].[PersonIdentity](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[IdentityTypeId] [int] NOT NULL,
	[PlaceReleased] [nvarchar](200) NOT NULL,
	[DateReleased] [datetime] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[IsDeleted] [bit] NULL,
	[Number] [varchar](20) NULL,
 CONSTRAINT [PK_PersonIdentity] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [Hr].[PersonLanguage]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[PersonLanguage](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[LanguageId] [int] NOT NULL,
	[Level] [nvarchar](50) NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_PersonLanguage] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[PersonPhone]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [Hr].[PersonPhone](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[PhoneNumber] [varchar](13) NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[PhoneType] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_PersonPhone] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [Hr].[PersonRelationship]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[PersonRelationship](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](200) NULL,
	[YearOfBirth] [int] NULL,
	[IsDead] [bit] NULL,
	[Address] [nvarchar](300) NULL,
	[PersonId] [int] NULL,
	[RelationshipId] [int] NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_PersonRelationship] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[PersonWorkHistory]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[PersonWorkHistory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NULL,
	[FromDate] [datetime] NULL,
	[ToDate] [datetime] NULL,
	[CompanyName] [nvarchar](300) NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_PersonWorkHistory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Hr].[PersonWorkLicense]    Script Date: 8/28/2019 9:00:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hr].[PersonWorkLicense](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[WorkLicenseId] [int] NULL,
	[Duration] [int] NULL,
	[FromDate] [datetime] NULL,
	[ToDate] [datetime] NULL,
	[PersonId] [int] NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_PersonWorkLicense] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
