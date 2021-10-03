'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.User.hasOne(models.comment, { foreignKey: 'user_id' });
            models.User.hasOne(models.scrap, { foreignKey: 'user_id' });
            models.User.hasOne(models.like, { foreignKey: 'user_id' });
            models.User.hasOne(models.dislike, { foreignKey: 'user_id' });
            models.User.hasOne(models.post_container, { foreignKey: 'user_id' });
            models.User.hasOne(models.post_container, { foreignKey: 'user_id' });
        }
    }
    User.init(
        {
            email: DataTypes.STRING,
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            profile_img: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        },
    );
    return User;
};
