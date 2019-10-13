ALTER PROC [Hr].[GetAllPerson]  



 @pageSize int = 0,  



 @pageIndex int = 0  



 AS  



 BEGIN  



 SELECT DISTINCT  



 p.Id,  
 p.EmpCode,



 p.FirstName,  



 p.LastName,  



 p.DoB,  



 (SELECT TOP 1 [Address] FROM [Hr].[PersonAddress] WHERE PersonId = p.Id AND [Type] =1 AND IsDeleted =0 ) AS [Address],  



 (SELECT TOP 1 [Address] FROM [Hr].[PersonAddress] WHERE PersonId = p.Id AND [Type] =2 AND IsDeleted =0 ) AS ContactAddress,  



 p.PhoneNumber,



 p.StartDate,  



 p.RoleId,    



 (SELECT TOP 1 ContractNumber FROM [Hr].[PersonContract] WHERE PersonId = p.id AND IsDeleted =0 ORDER BY SignedIn DESC) AS ContractNumber,  



 (SELECT TOP 1 ContractNumber FROM [Hr].[PersonContract] WHERE PersonId = p.id AND IsDeleted = 0 ORDER BY SignedIn DESC) AS ContractDuration  



 FROM [Hr].[Person] p   



 WHERE p.IsDeleted = 0  



 END  



 


