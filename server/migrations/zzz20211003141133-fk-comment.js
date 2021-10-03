'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('comments', 'post_id', Sequelize.INTEGER);
        await queryInterface.addConstraint('comments', {
            fields: ['post_id'],
            type: 'foreign key',
            name: 'comment_post_id_fk',
            references: {
                table: 'post_containers',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addColumn('comments', 'user_id', Sequelize.INTEGER);
        await queryInterface.addConstraint('comments', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'comment_user_id_fk',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface
            .removeColumn('comments', 'user_id')
            .then(queryInterface.removeColumn('comments', 'post_id'));
    },
};
