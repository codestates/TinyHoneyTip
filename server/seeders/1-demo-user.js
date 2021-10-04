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
        await queryInterface.bulkInsert('Users', [
            {
                email: 'peb4010@naver.com',
                username: 'peb',
                password: '123456789',
                profile_img:
                    'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
            },
            {
                email: 'data1@naver.com',
                username: 'data1',
                password: '123456789',
                profile_img:
                    'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
            },
            {
                email: 'data2@naver.com',
                username: 'data2',
                password: '123456789',
                profile_img:
                    'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
            },
            {
                email: 'data3@naver.com',
                username: 'data4',
                password: '123456789',
                profile_img:
                    'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
            },
            {
                email: 'data4@naver.com',
                username: 'data4',
                password: '123456789',
                profile_img:
                    'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
            },
            {
                email: 'data5@naver.com',
                username: 'data5',
                password: '123456789',
                profile_img:
                    'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
