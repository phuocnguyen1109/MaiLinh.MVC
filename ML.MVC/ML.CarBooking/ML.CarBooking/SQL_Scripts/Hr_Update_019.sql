ALTER PROC [Hr].[GetPersonHealthCheck]
@pid INT
AS
BEGIN

	SELECT *, 
	(STUFF((SELECT ',' + CONVERT(VARCHAR(2),c1.HealthStdId)
FROM [Hr].[PersonHealthStd] C1
WHERE c1.PersonHealthCheckId = hc.Id
FOR XML PATH('')),1,1,'')) AS [StandardIds]
FROM [Hr].[PersonHealthCheck] hc WHERE PersonId =@pid
END
