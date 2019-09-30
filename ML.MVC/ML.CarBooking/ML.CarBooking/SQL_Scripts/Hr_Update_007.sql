ALTER TABLE [Hr].[PersonEquipment]
ADD PersonId INT

GO
CREATE PROC [Hr].[GetPersonEquipments]
@pid INT
AS
BEGIN
	SELECT * FROM [Hr].[PersonEquipment] WHERE PersonId = @pid
END

GO
CREATE PROC [Hr].[CreateOrUpdatePersonEquipment]
@pid INT,
@equipmentId INT,
@receivedDate Datetime
AS
BEGIN
	IF EXISTS (SELECT 1 FROM [Hr].[PersonEquipment] Where PersonId = @pid AND EquipmentId = @equipmentId)
	BEGIN
		UPDATE [Hr].[PersonEquipment]
		SET ReceivedDate = @receivedDate
		WHERE PersonId = @pid AND EquipmentId = @equipmentId
	END
	ELSE
	BEGIN
		INSERT INTO [Hr].[PersonEquipment](EquipmentId, ReceivedDate, PersonId)
		VALUES(@equipmentId, @receivedDate, @pid)
	END
END
