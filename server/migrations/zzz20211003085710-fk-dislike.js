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
            .addConstraint('dislikes', {
                fields: ['user_id'],
                type: 'foreign key',
                name: 'dislike_user_id_fk',
                references: {
                    table: 'Users',
                    field: 'id',
                },
                onDelete: 'cascade',
                onUpdate: 'cascade',
            })
            .then(
                queryInterface.addConstraint('dislikes', {
                    fields: ['post_id'],
                    type: 'foreign key',
                    name: 'dislike_post_id_fk',
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
        await queryInterface
            .removeColumn('dislikes', 'user_id')
            .then(queryInterface.removeColumn('dislikes', 'post_id'));
    },
};
