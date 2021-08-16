'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                email: 'demo@user.io',
                username: 'Demo-lition',
                hashedPassword: bcrypt.hashSync('password'),
            },
            {
                email: faker.internet.email(),
                username: 'iSellPoutine',
                hashedPassword: bcrypt.hashSync(faker.internet.password()),
            },
            {
                email: faker.internet.email(),
                username: 'curdsRlove',
                hashedPassword: bcrypt.hashSync(faker.internet.password()),
            },
            {
                email: faker.internet.email(),
                username: 'Linda Poutine',
                hashedPassword: bcrypt.hashSync(faker.internet.password()),
            },
            {
                email: faker.internet.email(),
                username: 'gravyTrain',
                hashedPassword: bcrypt.hashSync(faker.internet.password()),
            },
            {
                email: faker.internet.email(),
                username: 'boat of gravy',
                hashedPassword: bcrypt.hashSync(faker.internet.password()),
            },
            {
                email: faker.internet.email(),
                username: 'poutineLuvver',
                hashedPassword: bcrypt.hashSync(faker.internet.password()),
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true});
    }
};
