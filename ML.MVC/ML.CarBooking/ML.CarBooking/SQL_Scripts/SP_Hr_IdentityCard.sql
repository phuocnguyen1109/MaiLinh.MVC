ALTER TABLE [Hr].[PersonIdentity]
ADD [Number] varchar(20)

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

CREATE PROC [Hr].[DeletePersonIdentity]
@id INT
AS
BEGIN

Delete FROM [Hr].[PersonIdentity] WHERE Id = @id
END
GO