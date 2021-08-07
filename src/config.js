import dotenv from 'dotenv';
dotenv.config();

export const MYSQL_SERVER = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  insecureAuth: true
};
