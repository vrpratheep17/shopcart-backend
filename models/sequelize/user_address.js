export default (sequelize, DataTypes) => {
    const user_address = sequelize.define(
      "user_address",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
        },
     
        type: {
          type: DataTypes.STRING,
          isIn: [["Home", "Office"]],
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          len: [2, 12],
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        landmark: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "user_address",
        updatedAt: "updated_at",
        createdAt: "created_at",
      }
    );
    return user_address;
  };