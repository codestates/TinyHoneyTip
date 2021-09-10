const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    development: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: 'tht',
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
    },
    test: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: 'tht',
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
    },
    production: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: 'tht',
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
    },
};
