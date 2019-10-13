
CREATE TABLE [Hr].[PersonHealthInsurance](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NULL,
	[Amount] [int] NULL,
	[Duration] [int] NULL,
	[FromDate] [datetime] NULL,
	[ToDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[IsDeleted] [bit] NULL
) ON [PRIMARY]
GO

ALTER TABLE [Hr].[PersonHealthInsurance] ADD  CONSTRAINT [DF_PersonHealthInsurance_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

CREATE PROC [Hr].[GetPersonHealthInsurance]
@pid INT
AS
BEGIN
	SELECT * FROM [Hr].[PersonHealthInsurance]
	WHERE IsDeleted = 0 AND PersonId = @pid
END

GO

CREATE PROC [Hr].[CreateOrUpdatePersonHealthInsurance]
@id int ,
@pid int,
@amount int,
@duration int,
@fromDate Datetime,
@toDate Datetime,
@userId int,
@isDeleted BIT 
AS
BEGIN
	IF @id =0 
	BEGIN 
		INSERT INTO Hr.PersonHealthInsurance (PersonId, Amount, Duration, FromDate, ToDate, CreatedBy, CreatedOn)
		VALUES ( @pid, @amount, @duration, @fromDate, @toDate, @userId, GETDATE())
		SELECT @@IDENTITY
	END
	ELSE
	BEGIN
		UPDATE Hr.PersonHealthInsurance 
		SET
			Amount = @amount,
			Duration = @duration,
			FromDate = @fromDate,
			ToDate= @toDate,
			IsDeleted = @isDeleted,
			UpdatedBy  = @userId,
			UpdatedOn = GETDATE()
		WHERE Id = @id
		SELECT @@ROWCOUNT
	END
END


