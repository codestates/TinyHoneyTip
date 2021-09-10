'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const { User, scrap, post, post_container, like, dislike, comment } = sequelize.models;

post_container.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(post_container);

post_container.hasMany(post);
post.belongsTo(post_container, { foreignKey: 'post_id' });

User.belongsToMany(post_container, { through: 'like', foreignKey: 'post_id' });
post_container.belongsToMany(User, { through: 'like', foreignKey: 'user_id' });

User.belongsToMany(post_container, { through: 'dislike', foreignKey: 'post_id' });
post_container.belongsToMany(User, { through: 'dislike', foreignKey: 'user_id' });

User.belongsToMany(post_container, { through: 'scrap', foreignKey: 'post_id' });
post_container.belongsToMany(User, { through: 'scrap', foreignKey: 'user_id' });

User.belongsToMany(post_container, { through: 'comment', foreignKey: 'post_id' });
post_container.belongsToMany(User, { through: 'comment', foreignKey: 'user_id' });

module.exports = db;
