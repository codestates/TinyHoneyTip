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
            models.comment.belongsTo(models.post_container, { foreignKey: 'post_id' });
            models.comment.belongsTo(models.User, { foreignKey: 'user_id' });
        }
    }
    comment.init(
        {
            txt: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'comment',
        },
    );
    return comment;
};
