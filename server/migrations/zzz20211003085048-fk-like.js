'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface
            .addConstraint('likes', {
                fields: ['user_id'],
                type: 'foreign key',
                name: 'like_user_id_fk',
                references: {
                    table: 'Users',
                    field: 'id',
                },
                onDelete: 'cascade',
                onUpdate: 'cascade',
            })
            .then(
                queryInterface.addConstraint('likes', {
                    fields: ['post_id'],
                    type: 'foreign key',
                    name: 'like_post_id_fk',
                    references: {
                        table: 'post_containers',
                        field: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade',
                }),
            );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('likes', 'user_id').then(queryInterface.removeColumn('likes', 'post_id'));
    },
};
