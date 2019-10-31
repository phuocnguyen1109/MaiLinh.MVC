ALTER PROC [Hr].[GetPersonRelationShip]  
@PersonId INT  
AS  
BEGIN  
select * from Hr.PersonRelationShip  WHERE PersonId =@PersonId
END  
GO

CREATE PROC [Hr].[GetPersonProcessDateTime]
@pid INT
AS
BEGIN
	SELECT StartDate,
	(SELECT TOP 1 SignedIn FROM Hr.PersonContract WHERE PersonId=@pid AND IsDeleted = 0 ORDER BY SignedIn DESC) AS JoinDate 
	FROM Hr.Person WHERE Id=@pid
END
  
 select * from hr.PersonWorkLeaveHistory