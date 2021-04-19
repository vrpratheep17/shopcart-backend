export default (sequelize, DataTypes) => {
  const payment = sequelize.define(
    "payment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mode_of_payment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "payment",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
    
  );

   payment.associate = (models) => {
    payment.hasMany(models.cart, {
      onDelete: "cascade",
    });
    models.cart.belongsTo(payment);
  }
      // payment.associate = function (models) {
      //   payment.hasOne(models.user, {
      //     foreignKey: "id",
      //     as: "user",
      //   });
      // };
  return payment;
};
