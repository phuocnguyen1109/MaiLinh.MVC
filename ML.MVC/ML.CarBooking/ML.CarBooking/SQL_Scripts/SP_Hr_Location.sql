

CREATE PROC [Hr].[GetAllLocation]
@type INT =0,
@parentId INT = 0
AS
BEGIN
	IF ISNULL(@type,-1)= -1
	BEGIN
	--Get Country
	SELECT * FROM [Hr].[MLocation] WHERE [Type] = 0

	--Get City
	SELECT * FROM [Hr].[MLocation] WHERE [Type] = 1

	--Get District
	SELECT * FROM [Hr].[MLocation] WHERE [Type] = 2
	
	END
	ELSE
	BEGIN
	SELECT * FROM [Hr].[MLocation] WHERE [Type] = @type AND ParentId = @parentId
	END
END

GO

CREATE PROC [Hr].[AddOrUpdateLocation]
@id INT,
@parentId INT,
@name nvarchar(400),
@type INT
AS
BEGIN
	IF @id = 0
	BEGIN
		INSERT INTO [Hr].[MLocation] (ParentId, [Name], [Type])
		VALUES (@parentId, @name, @type)
	END
	ELSE
	BEGIN
		UPDATE [Hr].[MLocation]
		SET ParentId = @parentId,
		Name = @name,
		[Type] = @type
		WHERE Id = @id
	END
END

GO

CREATE PROC [Hr].[DeleteLocation]
@ids IdsTable READONLY
AS
BEGIN
	DELETE FROM [Hr].[MLocation] WHERE Id IN (SELECT Id FROM @ids)
END





