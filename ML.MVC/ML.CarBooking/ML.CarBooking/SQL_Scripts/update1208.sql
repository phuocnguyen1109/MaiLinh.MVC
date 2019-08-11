select * from Hr.PersonAddress

CREATE PROC [Hr].[GetPersonAddress]
@pid INT
AS
BEGIN
	SELECT * FROM [Hr].[PersonAddress] WHERE PersonId = @pid AND IsDeleted = 0
END

GO
-- Create the data type
CREATE TYPE [Hr].[PersonAddressTable] AS TABLE 
(
	PersonId INT , [Type] INT, [Address] NVARCHAR(400), DistrictId INT, CityId INT
)
GO

CREATE PROC [Hr].[UpdatePersonAddress]
@addresstbl [Hr].[PersonAddressTable] READONLY,
@userId INT
AS
BEGIN
DECLARE @personId INT
SELECT TOP 1 @personId = PersonId FROM @addresstbl  
DELETE FROM [Hr].[PersonAddress] WHERE PersonId = @personId

INSERT INTO [Hr].[PersonAddress](PersonId, [Type], [Address], CityId, DistrictId, CreatedBy, CreatedOn, IsDeleted)
SELECT PersonId, [Type], [Address], CityId, DistrictId, @userId, GETDATE(), 0
FROM @addresstbl
END

GO
CREATE PROC [Hr].[GetAllCity]
AS
BEGIN
	SELECT * FROM [Hr].[MLocation] WHERE [Type]= 1
END

GO

CREATE PROC [Hr].[GetAllDisctrictByCityId]
@cityId INT
AS
BEGIN
	SELECT * FROM [Hr].[MLocation] WHERE [Type] = 2 AND  ParentId = @cityId
END

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

