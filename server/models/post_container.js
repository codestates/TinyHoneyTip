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
            models.post_container.belongsTo(models.comment, { foreignKey: 'post_id' });
            models.post_container.belongsTo(models.scrap, { foreignKey: 'post_id' });
            models.post_container.belongsTo(models.like, { foreignKey: 'post_id' });
            models.post_container.belongsTo(models.dislike, { foreignKey: 'post_id' });
            models.post_container.hasMany(models.post, { foreignKey: 'post_id' });
            models.post_container.belongsTo(models.User, { foreignKey: 'user_id' });
        }
    }
    post_container.init(
        {
            title: DataTypes.STRING,
            category: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'post_container',
        },
    );
    return post_container;
};
