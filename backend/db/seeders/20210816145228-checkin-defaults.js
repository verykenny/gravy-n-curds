'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Checkins', [
            {
                userId: 1,
                poutineId: 6,
                comment: 'heard about this on rebetiko radio, decided to give it a try.',
                rating: 4,
            },
            {
                userId: 1,
                poutineId: 7,
                comment: 'Love me some veggies on my poutine! Try it out!',
                rating: 5,
            },
            {
                userId: 1,
                poutineId: 8,
                comment: 'needed a quick bine of poutine and this was the perfect size. Quick and easy to eat!',
                rating: 4,
            },
            {
                userId: 1,
                poutineId: 12,
                comment: 'WAY TOO MESSY!',
                rating: 2,
            },
            {
                userId: 1,
                poutineId: 15,
                comment: 'I love just being able to grab a bag of poutine for the road. Gotta try this again.',
                rating: 5,
            },
            {
                userId: 3,
                poutineId: 1,
                comment: 'this poutine is amiable.',
                rating: 4,
            },
            {
                userId: 3,
                poutineId: 3,
                comment: 'This poutine works certainly well. It energetically improves my golf by a lot.',
                rating: 5,
            },
            {
                userId: 3,
                poutineId: 6,
                comment: 'this poutine is awesome.',
                rating: 5,
            },
            {
                userId: 3,
                poutineId: 7,
                comment: 'I hate veggies',
                rating: 1,
            },
            {
                userId: 4,
                poutineId: 1,
                comment: 'Some of the best poutine I have ever had...and I have had a lot of poutine!',
                rating: 5,
            },
            {
                userId: 4,
                poutineId: 10,
                comment: 'I thought that this would be a burger with poutine inside, and it was!',
                rating: 4,
            },
            {
                userId: 4,
                poutineId: 13,
                comment: 'Who doesn\'t love bacon!?',
                rating: 5,
            },
            {
                userId: 4,
                poutineId: 15,
                comment: 'Kinda messy and gross if you let it sit too long',
                rating: 2,
            },
            {
                userId: 4,
                poutineId: 16,
                comment: 'Some much poutine!',
                rating: 4,
            },
            {
                userId: 5,
                poutineId: 1,
                comment: 'I keep coming back for more!',
                rating: 5,
            },
            {
                userId: 5,
                poutineId: 2,
                comment: 'All I can say is "eww, gross..."',
                rating: 1,
            },
            {
                userId: 5,
                poutineId: 6,
                comment: 'Love my duck!',
                rating: 4,
            },
            {
                userId: 5,
                poutineId: 7,
                comment: 'Too many veggies and not enough curds',
                rating: 1,
            },
            {
                userId: 6,
                poutineId: 8,
                comment: 'Great if you just need something for when you\'re on the go!',
                rating: 3,
            },
            {
                userId: 6,
                poutineId: 9,
                comment: 'If you like peas...I guess it\'s ok',
                rating: 3,
            },
            {
                userId: 7,
                poutineId: 9,
                comment: 'I can\'t get enough peas. My wife always says that I need to eat more peas and here is the perfect dish to satisfy my poutine craving!',
                rating: 5,
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete('Checkins', null, {truncate: true, cascade: true, restartIdentity: true});
    }
};
