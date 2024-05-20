import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT,
  dbUserName: process.env.DB_USER_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME
};

export default config;
