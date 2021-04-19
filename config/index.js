const dotenv = require("dotenv");
dotenv.config();


let config = {
    PORT: process.env.PORT,
    salt_rounds:process.env.salt_rounds,
    db: {
      host: process.env.psql_host,
      dialect: process.env.psql_db_type,
      database: process.env.psql_db_name,
      username: process.env.psql_db_user,
      password: process.env.psql_db_pass,
       
    },
    Access_token_secret: process.env.access_token_secret,
    Refresh_token_secret: process.env.refresh_token_secret,
    redis_port:process.env.redis_port,
    redis_host:process.env.redis_host,
    redis_password:process.env.redis_password
  };
  
  export default config;