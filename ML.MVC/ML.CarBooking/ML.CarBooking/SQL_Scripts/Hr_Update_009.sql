
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
		SELECT @id =Id FROM [Hr].[PersonHealthCheck] WHERE [Year] = @year AND PersonId = @pid
		EXEC [Hr].[UpdateHealthCheck] @pid, @id, @userId, @stdIds, @year, @note

	END
END

GO

CREATE TABLE [Hr].[PersonWorkLeaveHistory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[ContractDate] [datetime] NULL,
	[Reason] [nvarchar](4000) NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [nchar](10) NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_PersonWorkLeaveHistory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [Hr].[PersonWorkLeaveHistory] ADD  CONSTRAINT [DF_PersonWorkLeaveHistory_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]


GO
CREATE PROC [Hr].[GetPersonWorkLeaveHistory]
@pid INT
AS
BEGIN
	SELECT * FROM [Hr].[PersonWorkLeaveHistory] WHERE PersonId =@pid AND IsDeleted = 0
END


GO
CREATE PROC [Hr].[CreatePersonWorkLeaveHistory]
@pid INT,
@startDate DateTime,
@endDate dateTime,
@contractDate DateTime,
@reason NVARCHAR(4000),
@userId Int
AS
BEGIN
	INSERT INTO [Hr].[PersonWorkLeaveHistory](PersonId, StartDate, EndDate, ContractDate, Reason, CreatedBy, CreatedOn)
	VALUES (@pid, @startDate, @endDate, @contractDate, @reason, @pid, GETDATE())
	SELECT @@IDENTITY
END


GO

CREATE PROC [Hr].[UpdatePersonWorkLeaveHistory]
@id INT,
@startDate DateTime,
@endDate DateTime,
@contractDate dateTime,
@reason nvarchar(4000),
@userId int
AS
BEGIN
	UPDATE [Hr].[PersonWorkLeaveHistory]
	SET
		StartDate = @startDate,
		EndDate = @endDate,
		ContractDate = @contractDate,
		Reason = @reason,
		UpdatedBy = @userId,
		UpdatedOn = GETDATE()
	WHERE Id = @id AND IsDeleted = 0
	
	SELECT @@ROWCOUNT
END
GO

CREATE PROC [Hr].[DeletePersonWorkLeaveHistory]
@id INT,
@userId int
AS
BEGIN
	Update [Hr].[PersonWorkLeaveHistory]
	SET IsDeleted = 1, UpdatedBy = @userId, UpdatedOn= GETDATE()
	WHERE Id = @id

	SELECT @@ROWCOUNT
END
