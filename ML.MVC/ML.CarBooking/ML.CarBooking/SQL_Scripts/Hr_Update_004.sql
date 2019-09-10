D:\Source\Others\MaiLinhINSERT INTO [Hr].[Mlanguage](Name, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn)
VALUES(N'Tiếng Anh', 1, GETDATE(), 1, GETDATE())
INSERT INTO [Hr].[Mlanguage](Name, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn)
VALUES(N'Tiếng Pháp', 1, GETDATE(), 1, GETDATE())
INSERT INTO [Hr].[Mlanguage](Name, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn)
VALUES(N'Tiếng Hàn Quốc', 1, GETDATE(), 1, GETDATE())
INSERT INTO [Hr].[Mlanguage](Name, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn)
VALUES(N'Tiếng Nhật', 1, GETDATE(), 1, GETDATE())
INSERT INTO [Hr].[Mlanguage](Name, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn)
VALUES(N'Tiếng Trung Quốc', 1, GETDATE(), 1, GETDATE())
INSERT INTO [Hr].[Mlanguage](Name, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn)
VALUES(N'Tiếng Ấn Độ', 1, GETDATE(), 1, GETDATE())
INSERT INTO [Hr].[Mlanguage](Name, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn)
VALUES(N'Tiếng Thái Lan', 1, GETDATE(), 1, GETDATE())
INSERT INTO [Hr].[Mlanguage](Name, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn)
VALUES(N'Tiếng Tây Ban Nha', 1, GETDATE(), 1, GETDATE())

GO
CREATE PROC [Hr].[GetMLanguages]
AS
BEGIN
SELECT * FROM [Hr].[MLanguage]
END

GO
CREATE PROC [Hr].[GetPersonEducations]
@Pid INT
AS
BEGIN
SELECT PL.Id, PL.PersonId, PL.LanguageId, L.[Name] AS LanguageName, PL.[Level] 
FROM [Hr].[PersonLanguage] PL 
JOIN [Hr].[MLanguage] L ON PL.LanguageId = L.Id
WHERE PL.PersonId = @Pid


SELECT * FROM [Hr].[PersonEducation] WHERE PersonId = @Pid

SELECT * FROM [Hr].[PersonDriveLicense] WHERE PersonId = @Pid

SELECT * FROM [Hr].[PersonWorkLicense] WHERE PersonId = @Pid
END