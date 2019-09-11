-- =============================================
-- Author:		Nhan Pham
-- Create date: 2019-09-111
-- Description:	Create/edit equipment
-- =============================================
CREATE PROCEDURE [Hr].Equipment_AssignUnassign_Person
	@equipmentId INT, 
	@personId INT,
	@receivedDate DATETIME = NULL,
	@userId INT = NULL,
	@isAssign BIT
AS
BEGIN
	DECLARE @personExist INT
	DECLARE @equipmentExist INT

	SELECT @personExist = COUNT(*) FROM [Hr].[Person] WHERE [Id] = @personId
	SELECT @equipmentExist = COUNT(*) FROM [Hr].[MEquipment] WHERE [Id] = @equipmentId

	IF @personExist = 0 AND @equipmentExist = 0
		SELECT N'Person ID or Equipment ID is not correct' as ErrorMessage

	IF @isAssign = 1
		INSERT INTO [Hr].[PersonEquipment] ([EquipmentId], [PersonId], [ReceivedDate], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) 
										VALUES(@equipmentId, @personId, @receivedDate, @userId, GETDATE(), @userId, GETDATE())
	ELSE
		DELETE [Hr].[PersonEquipment] WHERE [EquipmentId] = @equipmentId AND [PersonId] = @personId			
END
GO
