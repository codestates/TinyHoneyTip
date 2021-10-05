'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('posts', 'post_id', Sequelize.INTEGER);
        await queryInterface.addConstraint('posts', {
            fields: ['post_id'],
            type: 'foreign key',
            name: 'post_post_id_fk',
            references: {
                table: 'post_containers',
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
        await queryInterface.removeColumn(queryInterface.removeColumn('posts', 'post_id'));
    },
};
