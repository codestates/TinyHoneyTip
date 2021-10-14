'use strict';

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
        const postId = await queryInterface.sequelize.query(`SELECT id from post_containers;`);
        await queryInterface.bulkInsert('posts', [
            {
                content: '가나다라',
                img: 'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
                post_id: postId[0].id,
            },
            {
                content: '마바사',
                img: 'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
                post_id: postId[1].id,
            },
            {
                content: '아자차카',
                img: 'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
                post_id: postId[2].id,
            },
            {
                content: '타파하',
                img: 'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
                post_id: postId[3].id,
            },
            {
                content: 'abcd',
                img: 'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
                post_id: postId[4].id,
            },
            {
                content: 'efghijklmnopqrstuwxyz',
                img: 'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
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
        await queryInterface.bulkDelete('posts', null, {});
    },
};
