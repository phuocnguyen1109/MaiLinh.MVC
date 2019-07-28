CREATE PROC [Hr].[GetPagesWorkHistory]
@pid INT
AS
BEGIN
SELECT * FROM [Hr].[PersonWorkHistory]
END
