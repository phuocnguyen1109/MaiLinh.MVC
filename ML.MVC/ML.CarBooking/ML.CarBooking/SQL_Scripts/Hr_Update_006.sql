ALTER PROC [Hr].[UserLogin]

@userName varchar(50),

@password varchar(50)

AS

BEGIN
	Declare @result BIT = 0
	SELECT @result = 1 FROM [Hr].[PersonAccount] 
	WHERE UserName=@userName AND [PassWord] = @password
	SELECT @result
END
