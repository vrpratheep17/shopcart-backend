export default (sequelize, DataTypes) => {
  const cart = sequelize.define(
    "cart",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // userId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // item_id: {
      //   primaryKey: true,
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // payment_id: {
      //   type: DataTypes.INTEGER,
      // },
    },
    {
      tableName: "cart",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
  // cart.associate = function (models) {
  //   cart.hasOne(models.item, {
  //     foreignKey: "id",
  //     as: "item",
  //   });
  //   cart.belongsTo(models.user);
//  

  return cart;
};
