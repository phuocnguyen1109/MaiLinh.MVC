GO
CREATE PROC [Hr].[UpdatePersonInformation]
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
@sIContractNUmber int
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
     
 WHERE Id = @pid
END
