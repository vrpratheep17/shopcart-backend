export default (sequelize, DataTypes) => {
    const wishlist = sequelize.define(
      "wishlist",
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
        //   type: DataTypes.INTEGER,
        //   primaryKey: true,
        //   allowNull: false,
        // },
      },
      {
        tableName: "wishlist",
        updatedAt: "updated_at",
        createdAt: "created_at",
      }
    );
      // wishlist.associate = function (models) {
      //   wishlist.hasOne(models.item, {
      //     foreignKey: "id",
      //     as: "item",
      //   });
      // };
    return wishlist;
  };