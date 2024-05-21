import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  dbUserName: process.env.DB_USER_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET || "",
};

export default config;
