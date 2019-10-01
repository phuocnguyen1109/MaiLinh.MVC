ALTER PROC [Hr].[CreatePersonHealthCheck]

@pid INT,

@userId INT, 

@stdIds IdsTable READONLY, 

@year INT, 

@note NVARCHAR(4000)

AS

BEGIN

	DECLARE @id INT

	IF NOT EXISTS (SELECT 1 FROM [Hr].[PersonHealthCheck] WHERE [Year] = @year AND PersonId = @pid)

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
ALTER PROC [Hr].[GetPersonHealthCheck]
@pid INT
AS
BEGIN

	SELECT *, 
	(STUFF((SELECT ',' + CONVERT(VARCHAR(2),c1.HealthStdId)
FROM [Hr].[PersonHealthStd] C1
WHERE c1.PersonHealthCheckId = hc.Id
FOR XML PATH('')),1,1,'')) AS [StandardIds]
FROM [Hr].[PersonHealthCheck] hc
END

GO
ALTER PROC [Hr].[DeleteHealthCheck]

@id INT

AS

BEGIN

	DELETE FROM [Hr].[PersonHealthStd] WHERE PersonHealthCheckId = @id

	DELETE FROM [Hr].[PersonHealthCheck] WHERE Id =@id

END

