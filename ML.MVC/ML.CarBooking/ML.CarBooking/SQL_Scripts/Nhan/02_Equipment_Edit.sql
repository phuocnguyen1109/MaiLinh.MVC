-- =============================================
-- Author:		Nhan Pham
-- Create date: 2019-09-111
-- Description:	Create/edit equipment
-- =============================================
CREATE PROCEDURE [Hr].Equipment_Edit
	@equipmentId INT = 0, 
	@equipmentName NVARCHAR(200),
	@userId INT = NULL
AS
BEGIN	
	IF @equipmentId = 0
		INSERT INTO [Hr].[MEquipment] VALUES(@equipmentName, @userId, GETDATE(), @userId, GETDATE())
	ELSE
		UPDATE [Hr].[MEquipment] SET
			[Name] = @equipmentName,
			[UpdatedBy] = @userId,
			[UpdatedOn] = GETDATE()
		WHERE [Id] = @equipmentId			
END
GO
