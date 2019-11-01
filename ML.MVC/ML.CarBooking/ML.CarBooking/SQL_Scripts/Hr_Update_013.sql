CREATE TABLE [Hr].[PersonLifeInsurance](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NULL,
	[Number] [varchar](50) NULL,
	[JoinLevel] [int] NULL,
	[FromDate] [datetime] NULL,
	[ToDate] [datetime] NULL,
	[Amount] [int] NULL,
 CONSTRAINT [PK_PersonLifeInsurance] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE PROC [Hr].[GetPersonLifeInsurance]
@pid int
as
begin
	select * from hr.PersonLifeInsurance where PersonId = @pid
end

GO
Create proc [Hr].[CreateOrUpdatePersonLifeInsurance]
@id int,
@pid int,
@number varchar(50),
@joinLevel int,
@fromDate DateTime,
@toDate DateTime,
@amount int
as
begin
	if @id = 0 
	begin
		insert into hr.PersonLifeInsurance ( PersonId, Number, JoinLevel, FromDate, ToDate, Amount)
		values (@pid, @number, @joinLevel, @fromDate, @toDate, @amount)
		select @@IDENTITY
	end
	else
	begin 
		update hr.PersonLifeInsurance
		set
			Number = @number,
			JoinLevel = @joinLevel,
			FromDate = @fromDate,
			ToDate = @toDate,
			Amount= @amount
		where id = @id
		select @@ROWCOUNT
	end

end

GO
CREATE PROC [Hr].[DeletePersonLifeInsurance]
@id int
as
begin
	delete from hr.PersonLifeInsurance where Id = @id
end
GO