'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('post_containers', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'fk_post_containers_Users_id',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('posts', {
            fields: ['post_id'],
            type: 'foreign key',
            name: 'fk_posts_post_containers_id',
            references: {
                table: 'post_containers',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('likes', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'fk_likes_Users_id',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('likes', {
            fields: ['post_id'],
            type: 'foreign key',
            name: 'fk_likes_post_containers_id',
            references: {
                table: 'post_containers',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('dislikes', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'fk_dislikes_Users_id',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('dislikes', {
            fields: ['post_id'],
            type: 'foreign key',
            name: 'fk_dislikes_post_containers_id',
            references: {
                table: 'post_containers',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('comments', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'fk_comments_Users_id',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('comments', {
            fields: ['post_id'],
            type: 'foreign key',
            name: 'fk_comments_post_containers_id',
            references: {
                table: 'post_containers',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('scraps', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'fk_scraps_Users_id',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('scraps', {
            fields: ['post_id'],
            type: 'foreign key',
            name: 'fk_scraps_post_containers_id',
            references: {
                table: 'post_containers',
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
