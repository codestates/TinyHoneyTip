'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    comment.init(
        {
            user_id: DataTypes.INTEGER,
            post_id: DataTypes.INTEGER,
            txt: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'comment',
            underscored: true,
        },
    );
    return comment;
};
