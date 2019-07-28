ALTER TABLE [Hr].[PersonHealthCheck]
ADD PersonId INT

ALTER TABLE [Hr].[PersonHealthStd]
DROP COLUMN PersonId

ALTER TABLE [Hr].[PersonHealthStd]
ADD PersonHealthCheckId INT

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

CREATE PROC [Hr].[DeleteHealthCheck]
@ids IdsTable READONLY
AS
BEGIN
	DELETE FROM [Hr].[PersonHealthStd] WHERE PersonHealthCheckId IN (SELECT Id FROM @ids)
	DELETE FROM [Hr].[PersonHealthCheck] WHERE Id IN (SELECT Id FROM @ids)
END



GO
CREATE PROC [Hr].[GetMHealthCheck]
AS
BEGIN
	SELECT * FROM [Hr].[MHealthStd]
END


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
CREATE PROC [Hr].[DeleteMHealthCheck]
@ids IdsTable READONLY
AS
BEGIN
	DELETE FROM [Hr].[MHealthStd] WHERE Id IN (SELECT Id FROM @ids)

END

GO

CREATE PROC [Hr].[GetPersonHealthCheckById]
@id INT
AS
BEGIN
SELECT * FROM [Hr].[PersonHealthCheck] WHERE Id = @id
SELECT * FROM [Hr].[PersonHealthStd] WHERE PersonHealthCheckId = @id

END
