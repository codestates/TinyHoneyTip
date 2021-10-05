'use strict';

const { userInfo } = require('os');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const userId = queryInterface.sequelize.query(`SELECT id from Users;`);
        const postId = queryInterface.sequelize.query(`SELECT id from post_containers;`);
        await queryInterface.bulkInsert('scraps', [
            {
                user_id: userId[0].id,
                post_id: postId[0].id,
            },
            {
                user_id: userId[1].id,
                post_id: postId[1].id,
            },
            {
                user_id: userId[2].id,
                post_id: postId[2].id,
            },
            {
                user_id: userId[3].id,
                post_id: postId[3].id,
            },
            {
                user_id: userId[4].id,
                post_id: postId[4].id,
            },
            {
                user_id: userId[5].id,
                post_id: postId[5].id,
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('scraps', null, {});
    },
};
