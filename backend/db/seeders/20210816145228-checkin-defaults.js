'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Checkins', [
            {
                userId: 2,
                poutineId: 1,
                comment: 'heard about this on rebetiko radio, decided to give it a try.',
                rating: 4
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete('Checkins', null, {truncate: true, cascade: true, restartIdentity: true});
    }
};
