-- =============================================
-- Author:		Nhan Pham
-- Create date: 2019-09-111
-- Description:	Get equipment list
-- =============================================
CREATE PROCEDURE Hr.Equipment_List	
AS
BEGIN	
	SELECT * FROM [Hr].[MEquipment]
END
GO
