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
        const userId = await queryInterface.sequelize.query(`SELECT id from Users;`);
        await queryInterface.bulkInsert('post_containers', [
            { title: '가나다라', category: '생활', user_id: userId[0].id },
            { title: '마바사', category: '생활', user_id: userId[1].id },
            { title: '아자차카', category: '생활', user_id: userId[2].id },
            { title: '타파하', category: '생활', user_id: userId[3].id },
            { title: 'abcd', category: '생활', user_id: userId[4].id },
            { title: 'efghijklmnopqrstuwxyz', category: '생활', user_id: userId[5] },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('post_containers', null, {});
    },
};
