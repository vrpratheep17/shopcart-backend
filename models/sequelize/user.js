export default (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        len: [2, 20],
      },
      mobile_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      otp: {
        type: DataTypes.INTEGER,
        min: 5,
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "user",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
  user.associate = (models) => {
    user.hasMany(models.cart, {
      onDelete: "cascade",
    });
    models.cart.belongsTo(user);
    user.hasMany(models.wishlist, {
      onDelete: "cascade",
    });
    models.wishlist.belongsTo(user);
    user.hasMany(models.user_address, {
      onDelete: "cascade",
    });
      models.user_address.belongsTo(user);
       user.hasMany(models.payment, {
         onDelete: "cascade",
       });
       models.payment.belongsTo(user);
  };
  return user;
};
