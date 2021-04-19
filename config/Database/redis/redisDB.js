  
import config from "../../index";
import redis from "redis";

let RDB = redis.createClient({
  port: config.redis_port,
  host: config.redis_host,
  password: config.redis_password,
});

export default RDB;