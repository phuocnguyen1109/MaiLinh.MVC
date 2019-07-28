
ALTER TABLE [Hr].[PersonPhone]
ADD PhoneType INT
ALTER TABLE [Hr].[PersonPhone]
ADD CreatedBy INT
ALTER TABLE [Hr].[PersonPhone]
ADD CreatedOn DateTime
ALTER TABLE [Hr].[PersonPhone]
ADD UpdatedBy INT
ALTER TABLE [Hr].[PersonPhone]
ADD  UpdatedOn DATETIME

GO 
CREATE PROC [Hr].[GetPersonPhones]
@pid INT
AS
BEGIN
SELECT phone.Id, phone.PhoneNumber, phone.PersonId, phone.PhoneType, (p.FirstName + ' '+ p.LastName) AS CreatedBy, phone.CreatedOn, (p2.FirstName + ' '+ p2.LastName) AS UpdatedBy, phone.UpdatedOn  
FROM [Hr].[PersonPhone] phone
LEFT JOIN [Hr].[Person] p ON phone.CreatedBy = p.Id
LEFT JOIN [Hr].[Person] p2 ON phone.UpdatedBy = p2.Id 
WHERE PersonId = @pid
END

GO
CREATE PROC [Hr].[AddPersonPhone]
@personId INT,
@number VARCHAR(13),
@phoneType INT,
@userId INT
AS
BEGIN
	INSERT INTO [Hr].[PersonPhone] (PersonId, PhoneNumber, PhoneType, CreatedBy, CreatedOn)
	VALUES(@personId, @number, @phoneType, @userId, GETDATE())
END

GO
CREATE PROC [Hr].[UpdatePersonPhone]
@id INT, 
@number VARCHAR(13),
@phoneType INT, 
@userId INT
AS
BEGIN
	UPDATE [Hr].[PersonPhone]
	SET PhoneNumber = @number,
	PhoneType = @phoneType,
	UpdatedBy = @userId,
	UpdatedOn = GETDATE()
	WHERE Id = @id

END

CREATE PROC [Hr].[DeletePersonPhone]
@id INT
AS
BEGIN
	DELETE FROM [Hr].[PersonPhone] WHERE Id =@id
END
