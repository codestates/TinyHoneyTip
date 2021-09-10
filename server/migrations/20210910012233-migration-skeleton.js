'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('post_container', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_user_id',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('post', {
            fields: ['postId'],
            type: 'foreign key',
            name: 'fk_post_id',
            references: {
                table: 'post_container',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('like', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_user_id',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('like', {
            fields: ['postId'],
            type: 'foreign key',
            name: 'fk_post_id',
            references: {
                table: 'post_container',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('dislike', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_user_id',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('dislike', {
            fields: ['postId'],
            type: 'foreign key',
            name: 'fk_post_id',
            references: {
                table: 'post_container',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('comment', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_user_id',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('comment', {
            fields: ['postId'],
            type: 'foreign key',
            name: 'fk_post_id',
            references: {
                table: 'post_container',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('scrap', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_user_id',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('scrap', {
            fields: ['postId'],
            type: 'foreign key',
            name: 'fk_post_id',
            references: {
                table: 'post_container',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('like', 'fk_user_id');
        await queryInterface.removeConstraint('like', 'fk_post_id');
        await queryInterface.removeConstraint('dislike', 'fk_user_id');
        await queryInterface.removeConstraint('dislike', 'fk_post_id');
        await queryInterface.removeConstraint('comment', 'fk_user_id');
        await queryInterface.removeConstraint('comment', 'fk_post_id');
        await queryInterface.removeConstraint('scrap', 'fk_user_id');
        await queryInterface.removeConstraint('scrap', 'fk_post_id');
    },
};
