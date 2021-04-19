import fs from "fs";
import path from "path";
import sequelize from "../config/Database/Postgresql/PGsql";
let basename = path.basename(__filename);

// models export contains all models
let models = {};

// Sequelize models
let dirname = __dirname + "/sequelize";
fs.readdirSync(dirname)
  .filter(function (file) {
    return (
      file.indexOf(".") !== 0 &&
      (file !== basename) & (file.slice(-3) === ".js")
    );
  })
  .forEach(function (file) {
    let model = sequelize.import(path.join(dirname, file));
    models[model.name] = model;
  });
Object.keys(models).forEach(function (modelName) {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;