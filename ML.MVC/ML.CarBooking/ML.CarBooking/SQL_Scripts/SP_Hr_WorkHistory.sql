CREATE TYPE IdsTable AS TABLE
(Id INT)

GO

CREATE PROC [Hr].[GetPagesWorkHistory]
@pid INT
AS
BEGIN
SELECT * FROM [Hr].[PersonWorkHistory]
END

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
END

GO

CREATE PROC [Hr].[DeleteWorkHistory]
@ids IdsTable READONLY
AS
BEGIN
	DELETE FROM [Hr].[PersonWorkHistory] WHERE Id IN (SELECT Id FROM @ids)
END

GO

CREATE PROC [Hr].[GetWorkHistoryById]
@id INT
AS
BEGIN
	SELECT * FROM [Hr].[PersonWorkHistory] WHERE Id =@id
END