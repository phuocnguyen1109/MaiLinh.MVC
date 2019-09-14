CREATE PROC [Hr].[GetPersonRelationShip]
@PersonId INT
AS
BEGIN
select * from Hr.PersonRelationShip
END

GO

CREATE PROC [Hr].[AddPersonRelationShip]
@PersonId INT, 
@FullName NVARCHAR(200),
@YearOfBirth INT,
@IsDead BIT,
@Address NVARCHAR(300),
@RelationShipId INT,
@UserId INT
AS
BEGIN
	DECLARE @isExist BIT
	IF NOT EXISTS (SELECT 1 FROM [Hr].[PersonRelationShip] WHERE PersonId = @PersonId AND RelationShipId = @RelationShipId)
	BEGIN
		INSERT INTO [Hr].[PersonRelationShip] (FullName, YearOfBirth, IsDead, [Address], PersonId, RelationShipId, CreatedBy, CreatedOn )
		VALUES (@FullName, @YearOfBirth, @IsDead, @Address, @PersonId, @RelationShipId, @UserId, GETDATE())
		SELECT @@ROWCOUNT AS Result
	END
	ELSE
	BEGIN
		SELECT -1 AS Result
	END
END

GO

CREATE PROC [Hr].[UpdatePersonRelationShip]
@Id INT, 
@FullName NVARCHAR(200),
@YearOfBirth INT,
@IsDead BIT,
@Address NVARCHAR(300),
@RelationShipId INT,
@UserId INT
AS
BEGIN
	UPDATE [Hr].[PersonRelationShip]
	SET FullName = @FullName,
		YearOfBirth = @YearOfBirth,
		IsDead = @IsDead,
		[Address] = @Address,
		RelationShipId = @RelationShipId,
		UpdatedBy = @UserId,
		UpdatedOn = GETDATE()
	WHERE Id = @Id
	SELECT @@ROWCOUNT AS Result
END

GO

CREATE PROC [Hr].[DeletePersonRelationShip]
@Id INT
AS
BEGIN
	DELETE FROM [Hr].[PersonRelationship] WHERE Id =@Id
	SELECT @@ROWCOUNT AS Result

END

GO
ALTER TABLE [Hr].[Person]
ADD MariageStatus INT

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
	p.MariageStatus

	 

	FROM [Hr].[Person] p

	JOIN [Hr].[PersonAccount] pa ON p.Id = pa.PersonId

	LEFT JOIN [Hr].[PersonContract] pc ON p.Id = pc.PersonId

	LEFT JOIN [Hr].PersonPhone phone ON p.Id = phone.PersonId

	LEFT JOIN [Hr].[PersonAddress] pa1 ON p.Id = pa1.PersonId AND pa1.[Type] =1

	LEFT JOIN [Hr].[PersonAddress] pa2 ON p.Id = pa2.PersonId AND pa2.[Type] =2

	WHERE p.Id = @id



END

GO


