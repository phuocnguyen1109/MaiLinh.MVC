    
 ALTER PROC [Hr].[CreateSimplePerson]    
 @firstName nvarchar(50),    
 @lastName nvarchar(150),    
 @userName varchar(30),    
 @gender int,  
 @employeeCode nchar(10)    
 AS    
 BEGIN    
  
  IF EXISTS ( SELECT 1 FROM Hr.Person WHERE EmpCode =@employeeCode)
  BEGIN
	SELECT -1
  END
  ELSE
  BEGIN

 DECLARE @password varchar(16) ='mailinh2019'    
  
 DECLARE @isMale BIT     
 IF @gender = 1    
 BEGIN    
 SET @isMale = 1    
 END    
 ELSE    
 BEGIN    
 SET @isMale = 0    
 END    
  
 INSERT INTO [Hr].[Person](FirstName, EmpCode, LastName, IsMale, Actived, IsDeleted)    
 VALUES (@firstName, @employeeCode, @lastName, @isMale, 1, 0)    
     
 DECLARE @newId int    
 SELECT @newId = @@IDENTITY    
     
 INSERT INTO [Hr].[PersonAccount] (UserName, PersonId, [PassWord], IsLocked)    
 VALUES (@userName, @newId, @password, 0 )     
    
 SELECT @newId AS Id    
    
 END    
 END

 GO
 ALTER TABLE [Hr].[PersonAccount]
 ADD [Role] INT NULL

 GO
 ALTER PROC [Hr].[UpdatePersonInformation]

@pid INT,

@fName NVARCHAR(50),
@lName NVARCHAR(150),

@isMale Bit,

@dob DateTime,

@placeOfBirth INT,

@homeTownId int,

@religionId INT, 

@nationId INT,

@countryId INT,

@mlcDate DateTime,

@startDate datetime,

@deptId INT,

@roleId INT,

@isPension BIT,

@siNote ntext,

@sINumber int,

@sIContractNUmber int,

@major NVARCHAR(200),

@gradeId INT,

@driveLicenseId INT,

@signedPlace nvarchar(400),

@expiredOn DateTime,

@email varchar(100),
@mariageStatus int,

@phoneNumber varchar(13),
@cooperationAmount int,
@cooperationFirstPay int,
@cooperationMinutePerMonth int,
@socialInsuranceCode varchar(50),
@socialInsuranceSalaryJoin int,
@socialInsurancePayPerMonth int,
@taxCode varchar(50)


AS
BEGIN 
UPDATE [Hr].[Person]
   SET 

	   [FirstName] = @fName

      ,[LastName] = @lName

      ,[FullName] = @fName +' '+@lName

      ,[IsMale] = @isMale

      ,[DoB] = @dob

      ,[PlaceOfBirth] = @placeOfBirth

      ,[HomeTownId] = @homeTownId

      ,[ReligionId] = @religionId

      ,[NationId] = @nationId

      ,[CountryId] = @countryId

      ,[MLCDate] = @mlcDate

      ,[StartDate] = @startDate

      ,[DepartmentId] = @deptId

      ,[RoleId] = @roleId

      ,[SINumber] = @sINumber

      ,[SIContractNumber] = @sIContractNUmber

      ,[IsPension] = @isPension

      ,[SINote] = @siNote

	  ,[Email] = @email
	  ,[MariageStatus] = @mariageStatus

	  ,[PhoneNumber] = @phoneNumber
	  ,[CooperationAmount] = @cooperationAmount 
	  ,[CooperationFirstPay]= @cooperationFirstPay 
	  ,[CooperationMinutePerMonth] =@cooperationMinutePerMonth 
	   ,SocialInsuranceCode = @socialInsuranceCode
	  , SocialInsuranceSalaryJoin =@socialInsuranceSalaryJoin
	  , SocialInsurancePayPerMonth = @socialInsurancePayPerMonth 
	  , TaxCode = @taxCode
 WHERE Id = @pid

 UPDATE [Hr].[PersonAccount]
 SET [Role] = @deptId
 WHERE PersonId = @pid

 IF EXISTS (SELECT 1 FROM [Hr].[PersonEducation] WHERE PersonId = @pid)
 BEGIN 
 UPDATE [Hr].[PersonEducation]



 SET GradeId = @gradeId,
	 Major = @major
 Where PersonId = @pid



 END



 ELSE



 BEGIN



	INSERT INTO [Hr].[PersonEducation] (PersonId, GradeId, Major) VALUES (@pid, @gradeId, @major)



 END







 IF EXISTS (SELECT 1 FROM [Hr].[PersonDriveLicense] WHERE PersonId = @pid)



 BEGIN 



 UPDATE [Hr].[PersonDriveLicense]



 SET DriveLicenseId = @driveLicenseId,



	 ExpiredOn = @expiredOn,



	 SignedPlace = @signedPlace



 Where PersonId = @pid



 END



 ELSE



 BEGIN
	INSERT INTO [Hr].[PersonDriveLicense] (PersonId, DriveLicenseId, SignedPlace, ExpiredOn) VALUES (@pid, @driveLicenseId, @signedPlace, @expiredOn)
 END
END


GO

ALTER PROC [Hr].[UserLogin]    
@userName varchar(50),    
@password varchar(50)    
AS    
    
BEGIN   
 Declare @id INT = 0
 Declare @role INT = 0
	SELECT @id = ISNULL(Id,0), 
		   @role =ISNULL([Role], 0) 
    FROM [Hr].[PersonAccount]     
	WHERE UserName=@userName 
	AND [PassWord] = @password   

   print @id
   print @role

 IF @id =0  
	BEGIN 
  --0: Không tìm thấy user
		SELECT 0 AS Id  
	END  
 ELSE  
	BEGIN  
	--Nếu không có role
	IF @role = 0 
		BEGIN
			-- -2: Không có role
			SELECT -2 AS Id
			print 'gothere'
		END
	ELSE
		BEGIN 
			SELECT 
			ISNULL(P.Id, -1) AS Id,  
			PA.UserName,  
			PA.[Role] as DepartmentId,
			P.RoleId,
			P.FirstName +' '+P.LastName AS FullName   
			FROM [Hr].[PersonAccount] PA  
			LEFT JOIN [Hr].[Person] P ON PA.PersonId = P.Id  
			WHERE PA.Id = @id  
		END
	END  
END 

  
    
