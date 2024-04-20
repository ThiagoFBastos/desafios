import "dotenv/config";
import { Options } from 'sequelize';

const {DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST} = process.env;

const config: Options = {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "dialect": "postgres",
    "logging": false
}

export = config;
