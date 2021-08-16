'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Stores', [
            {
                ownerId: 1,
                imageUrl: 'https://live.staticflickr.com/109/295646011_ca5bd14ea5.jpg',
                name: 'The Boost',
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete('Stores', {
            name: { [Op.in]: ['The Boost'] }
        }, {});
    }
};
