CREATE TABLE [product] (
  [id] int IDENTITY(1, 1),
  [userToken] nvarchar(255),
  [name] nvarchar(255),
  [category_id] int,
  [comment] nvarchar(255),
  [provider_id] int,
  [price] double,
  [quantity] int,
  [date_in] datetime,
  PRIMARY KEY ([id], [userToken])
)
GO

CREATE TABLE [category] (
  [id] int IDENTITY(1, 1),
  [userToken] nvarchar(255),
  [name] nvarchar(255),
  PRIMARY KEY ([id], [userToken])
)
GO

CREATE TABLE [provider] (
  [id] int IDENTITY(1, 1),
  [userToken] nvarchar(255),
  [name] nvarchar(255),
  [cel] int,
  [info] nvarchar(255),
  [per_price] double,
  PRIMARY KEY ([id], [userToken])
)
GO

ALTER TABLE [product] ADD FOREIGN KEY ([category_id]) REFERENCES [category] ([id])
GO

ALTER TABLE [product] ADD FOREIGN KEY ([provider_id]) REFERENCES [provider] ([id])
GO


EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'porcentagem do fornecedor sobre os produtos',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'provider',
@level2type = N'Column', @level2name = 'per_price';
GO
