'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class post_container extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    post_container.init(
        {
            title: DataTypes.STRING,
            category: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'post_container',
            underscored: true,
        },
    );
    return post_container;
};
