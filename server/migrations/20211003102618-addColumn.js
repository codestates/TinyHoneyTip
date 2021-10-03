'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        // await queryInterface
        //     .addColumn('post_containers', 'user_id', {
        //         type: Sequelize.INTEGER,
        //         references: {
        //             model: 'Users', // name of Source model
        //             key: 'id',
        //         },
        //         onUpdate: 'CASCADE',
        //         onDelete: 'CASCADE',
        //     })
        //     .then(
        //         queryInterface.addColumn('comments', 'user_id', {
        //             type: Sequelize.INTEGER,
        //             references: {
        //                 model: 'Users', // name of Source model
        //                 key: 'id',
        //             },
        //             onUpdate: 'CASCADE',
        //             onDelete: 'CASCADE',
        //         }),
        //     )
        //     .then(
        //         queryInterface.addColumn('comments', 'post_id', {
        //             // add post_id column to comment table
        //             type: Sequelize.INTEGER,
        //             references: {
        //                 model: 'post_containers',
        //                 key: 'id',
        //             },
        //             onUpdate: 'CASCADE',
        //             onDelete: 'CASCADE',
        //         }),
        //     )
        //     .then(
        //         queryInterface.addColumn('posts', 'post_id', {
        //             // add post_id column to comment table
        //             type: Sequelize.INTEGER,
        //             references: {
        //                 model: 'post_containers',
        //                 key: 'id',
        //             },
        //             onUpdate: 'CASCADE',
        //             onDelete: 'CASCADE',
        //         }),
        //     );
        // await queryInterface.addColumn('posts', 'post_id', {
        //               type: Sequelize.INTEGER,
        //               references: {
        //                   model: 'post_containers',
        //                   key: 'id',
        //               },
        //               onUpdate: 'CASCADE',
        //               onDelete: 'CASCADE',
        //           }),
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface
            .removeColumn('post_containers', 'user_id')
            .then(queryInterface.removeColumn('post', 'post_id'))
            .then(queryInterface.removeColumn('comment', 'user_id'))
            .then(queryInterface.removeColumn('comment', 'post_id'));
    },
};
