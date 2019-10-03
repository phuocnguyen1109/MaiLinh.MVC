CREATE TABLE [Hr].[PersonBankAccount](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[AccountName] [nvarchar](100) NULL,
	[BankId] [int] NULL,
	[AccountNumber] [varchar](20) NULL,
	[IsDeleted] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [PK_PersonBankAccount] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE PROC [Hr].[GetPersonAccountBank]
	@pid INT
AS
BEGIN
	SELECT * FROM [Hr].[PersonBankAccount] WHERE PersonId = @pid
END

GO
ALTER PROC [Hr].[CreateOrUpdatePersonBankAccount]
	@id INT,
	@pid INT,
	@accountName NVARCHAR(100),
	@bankId INT,
	@accountNumber varchar(20),
	@userId INT
AS
BEGIN
	IF @id = 0
	BEGIN
		INSERT INTO [Hr].[PersonBankAccount] (PersonId, AccountName, BankId, AccountNumber, IsDeleted, CreatedBy, CreatedOn)
		VALUES (@pid, @accountName, @bankId, @accountNumber, 0, @userId, GETDATE())
		SELECT @@IDENTITY
	END
	ELSE
	BEGIN
		UPDATE [Hr].[PersonBankAccount]
		SET 
			AccountName = @accountName,
			AccountNumber = @accountNumber,
			BankId = @bankId,
			UpdatedBy = @userId,
			UpdatedOn = GETDATE()
		WHERE Id = @id
	SELECT @@ROWCOUNT
	END
END

GO
CREATE PROC [Hr].[DeletePersonBankAccount]
@id INT,
@userId INT
AS
BEGIN
	UPDATE [Hr].[PersonBankAccount]
	SET
		IsDeleted = 1,
		UpdatedBy = @userId,
		UpdatedOn = GETDATE()
	WHERE Id = @id
END
