'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Stores', [
            {
                ownerId: 1,
                imageUrl: 'https://live.staticflickr.com/109/295646011_ca5bd14ea5.jpg',
                name: 'The Boost',
            },
            {
                ownerId: 1,
                imageUrl: 'https://live.staticflickr.com/8368/8547625963_2d4d313b12_b.jpg',
                name: 'Global Foodies',
            },
            {
                ownerId: 1,
                imageUrl: 'https://live.staticflickr.com/7002/6823820151_617d8bb58f_b.jpg',
                name: 'Canadian Express',
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete('Stores', null, {truncate: true, cascade: true, restartIdentity: true});
    }
};
