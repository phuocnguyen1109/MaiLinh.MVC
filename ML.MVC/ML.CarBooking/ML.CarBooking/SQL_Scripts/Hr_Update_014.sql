
ALTER TABLE [Hr].[PersonRelationship]
ADD [IsDependent] BIT DEFAULT 0
ALTER TABLE [Hr].[PersonRelationship]
ADD [DependentStart] DateTime
ALTER TABLE [Hr].[PersonRelationship]
ADD [DependentEnd] DateTime

GO
CREATE PROC [Hr].[GetPersonDependents]
@pid INT
AS
BEGIN
	SELECT * FROM [Hr].[PersonRelationship]
	WHERE IsDead = 0 AND IsDependent = 1
	
END

GO


ALTER PROC [Hr].[AddPersonRelationShip]

@PersonId INT, 

@FullName NVARCHAR(200),

@YearOfBirth INT,

@IsDead BIT,

@Address NVARCHAR(300),

@RelationShipId INT,

@UserId INT,
@IsDependent BIT,
@DependentStart DateTime,
@DependentEnd DateTime

AS

BEGIN

	DECLARE @isExist BIT

	IF NOT EXISTS (SELECT 1 FROM [Hr].[PersonRelationShip] WHERE PersonId = @PersonId AND RelationShipId = @RelationShipId)

	BEGIN

		INSERT INTO [Hr].[PersonRelationShip] (FullName, YearOfBirth, IsDead, [Address], PersonId, IsDependent, DependentStart, DependentEnd, RelationShipId, CreatedBy, CreatedOn )

		VALUES (@FullName, @YearOfBirth, @IsDead, @Address, @PersonId, @IsDependent, @DependentStart, @DependentEnd, @RelationShipId, @UserId, GETDATE())

		SELECT @@ROWCOUNT AS Result

	END

	ELSE

	BEGIN

		SELECT -1 AS Result

	END

END

GO


ALTER PROC [Hr].[UpdatePersonRelationShip]

@Id INT, 

@FullName NVARCHAR(200),

@YearOfBirth INT,

@IsDead BIT,

@Address NVARCHAR(300),

@RelationShipId INT,

@UserId INT,
@IsDependent BIT,
@DependentStart DateTime,
@DependentEnd DateTime

AS

BEGIN

	UPDATE [Hr].[PersonRelationShip]

	SET FullName = @FullName,

		YearOfBirth = @YearOfBirth,

		IsDead = @IsDead,

		[Address] = @Address,

		RelationShipId = @RelationShipId,

		UpdatedBy = @UserId,

		UpdatedOn = GETDATE(),
		IsDependent = @IsDependent,
		DependentStart = @DependentStart,
		DependentEnd = @DependentEnd

	WHERE Id = @Id

	SELECT @@ROWCOUNT AS Result

END



