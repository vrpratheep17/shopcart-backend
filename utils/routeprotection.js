const jwt = require("jsonwebtoken");
import config from "../config/index";
import models from "../models/index";

let route_protection = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ error: "No token, authorization denied", data: null });
  }

  try {
    jwt.verify(token, config.Access_token_secret, (error, decoded) => {
      
      if (error) {
        return res
          .status(401)
          .json({ error: "Token is not valid", data: null });
      } else {
        req.user=decoded
        next();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something broke", data: null });
  }
};

export default route_protection;