'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class dislike extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.dislike.belongsTo(models.post_container, { foreignKey: 'post_id' });
            models.dislike.belongsTo(models.User, { foreignKey: 'user_id' });
        }
    }
    dislike.init(
        {
            user_id: DataTypes.INTEGER,
            post_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'dislike',
        },
    );
    return dislike;
};
