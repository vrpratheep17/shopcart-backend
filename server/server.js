import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "../config/index.js";
import sequelize from "../config/Database/Postgresql/PGsql";
import RDB from "../config/Database/Redis/redisDB";
// importing routes
import User from "../routes/user/user_routes";
import Item from "../routes/item/item_routes";
import Payment from "../routes/payment/payment"
const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

app.use("/user", User);
app.use("/item", Item);
app.use("/payment",Payment)

sequelize
  .authenticate()
  .then(() => {
    console.log("PSQL Database connection Sucessful. Starting Server.....");
    app.listen(process.env.PORT, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

RDB.on("ready", () => console.log("Redis DB connection success"));
RDB.on("error", () => console.log("Unable to connect Redis DB"));

export default app;
