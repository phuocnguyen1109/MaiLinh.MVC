ALTER TABLE [Hr].[PersonWorkLicense]
ADD PersonId INT

GO

--MLanguage
CREATE PROC [Hr].[GetMLanguage]
AS
BEGIN
	SELECT * FROM [Hr].[MLanguage]
END

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
CREATE PROC [Hr].[DeleteMLanguage]
@ids IdsTable READONLY
AS
BEGIN
	DELETE FROM [Hr].[MLanguage] WHERE Id IN (SELECT Id FROM @ids)	
END

GO
CREATE PROC [Hr].[GetMlanguageById]
	@id INT
AS
BEGIN
	SELECT * FROM [Hr].[MLanguage] WHERE Id = @id
END
GO

-- MWorkLicense
CREATE PROC [Hr].[GetMWorkLicense]
AS
BEGIN
	SELECT * FROM [Hr].[MWorkLicense]
END

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
CREATE PROC [Hr].[DeleteMWorkLicense]
@ids IdsTable READONLY
AS
BEGIN
	DELETE FROM [Hr].[MWorkLicense] WHERE Id IN (SELECT Id FROM @ids)	
END

GO
CREATE PROC [Hr].[GetMWorkLicenseById]
	@id INT
AS
BEGIN
	SELECT * FROM [Hr].[MWorkLicense] WHERE Id = @id
END

GO

--MWorkDriveLicense
CREATE PROC [Hr].[GetMDriveLicenseType]
AS
BEGIN
	SELECT * FROM [Hr].[MDriveLicenseType]
END

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
CREATE PROC [Hr].[DeleteMDriveLicenseType]
@ids IdsTable READONLY
AS
BEGIN
	DELETE FROM [Hr].[MDriveLicenseType] WHERE Id IN (SELECT Id FROM @ids)	
END

GO
CREATE PROC [Hr].[GetMDriveLicenseById]
	@id INT
AS
BEGIN
	SELECT * FROM [Hr].[MDriveLicenseType] WHERE Id = @id
END

GO

 --Person Education
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

--Person Language
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

CREATE PROC [Hr].[DeletePersonLanguage]
	@id INT
AS
BEGIN
	DELETE FROM [Hr].[PersonLanguage] WHERE Id = @id
END

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


ALTER TABLE [Hr].[PersonWorkLicense]
ADD CreatedBy INT
ALTER TABLE [Hr].[PersonWorkLicense]
ADD CreatedOn DateTime
ALTER TABLE [Hr].[PersonWorkLicense]
ADD UpdatedBy INT
ALTER TABLE [Hr].[PersonWorkLicense]
ADD UpdatedOn DateTime

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
