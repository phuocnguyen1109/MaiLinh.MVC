
CREATE TABLE [Hr].[PersonLifeInsurance](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NULL,
	[Number] [varchar](50) NULL,
	[JoinLevel] [int] NULL,
	[FromDate] [datetime] NULL,
	[ToDate] [datetime] NULL,
	[Amount] [int] NULL,
 CONSTRAINT [PK_PersonLifeInsurance] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

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


