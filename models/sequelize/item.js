export default (sequelize, DataTypes) => {
  const item = sequelize.define(
    "item",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        len: [2, 40],
      },
      img: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      seller: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "item",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
    item.associate = (models) => {
    item.hasMany(models.cart, {
      onDelete: "cascade",
    });
    models.cart.belongsTo(item);

      item.hasMany(models.wishlist, {
        onDelete: "cascade",
      });
      models.wishlist.belongsTo(item);
  }
  
  return item;
};
