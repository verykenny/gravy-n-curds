'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Poutines', [
            {
                storeId: 1,
                name: 'Short Rib Poutine',
                imageUrl: 'https://i.imgur.com/b8zWbtd.png',
                description: 'shredded beef short rib in a rich demi, cheese curds & scallions'
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete('Poutines', null, {truncate: true, cascade: true, restartIdentity: true});
    }
};
