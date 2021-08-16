'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Poutines', [
            {
                // 1
                storeId: 1,
                name: 'Short Rib Poutine',
                imageUrl: 'https://live.staticflickr.com/7370/16386943481_b3cb0d4659_b.jpg',
                description: 'shredded beef short rib in a rich demi, cheese curds & scallions'
            },
            {
                // 2
                storeId: 1,
                name: 'Poutine Pizza',
                imageUrl: 'https://live.staticflickr.com/176/389291180_7cf9c91d65_b.jpg',
                description: 'get your poutine and pizza fix in one place!'
            },
            {
                // 3
                storeId: 2,
                name: 'Poutine Classique',
                imageUrl: 'https://live.staticflickr.com/3465/3813818441_ac0e6f7435_b.jpg',
                description: 'Classic poutine served with plenty of curds and love'
            },
            {
                // 4
                storeId: 2,
                name: 'Poutine Chicken Grand',
                imageUrl: 'https://live.staticflickr.com/8250/8479712222_55a7f1a04f.jpg',
                description: 'a delectable plate of poutine served with parsley and breaded chicken'
            },
            {
                // 5
                storeId: 2,
                name: 'Dense Poutine',
                imageUrl: 'https://live.staticflickr.com/3433/3814627202_4fc119d6d2_b.jpg',
                description: 'Poutine served with a all the toppings you could ever need. You won\'t need another after finishing this monstrosity.'
            },
            {
                // 6
                storeId: 3,
                name: 'Duck Poutine',
                imageUrl: 'https://live.staticflickr.com/2452/3813817267_6c05a956d6_b.jpg',
                description: 'Poutine with a fat duck steak served on the side.'
            },
            {
                // 7
                storeId: 3,
                name: 'Veggie Poutine',
                imageUrl: 'https://live.staticflickr.com/4051/4398886324_604fd45bbd_b.jpg',
                description: 'Poutine for the animal lover'
            },
            {
                // 8
                storeId: 3,
                name: 'Cup-o-poutine',
                imageUrl: 'https://live.staticflickr.com/8446/7755629742_a6dcb17b82_b.jpg',
                description: 'In a rush, don\'t forget to stop by for your cup of poutine to-go!'
            },
            {
                // 9
                storeId: 4,
                name: 'Poutine with peas',
                imageUrl: 'https://live.staticflickr.com/3287/3778008047_6caff44f9c_b.jpg',
                description: 'Love peas!? So do we! Poutine finally comes with peas!'
            },
            {
                // 10
                storeId: 4,
                name: 'Poutine Burger',
                imageUrl: 'https://live.staticflickr.com/7299/9735828017_859b41ea23_b.jpg',
                description: 'We couldn\'t help but create this beauty for our burger lovers. Get the new poutine burger today!'
            },
            {
                // 11
                storeId: 4,
                name: 'Liver and poutine',
                imageUrl: 'https://live.staticflickr.com/3125/2535333923_f1d056306c_b.jpg',
                description: 'Liver lover? try this ...somewhat tasty liver and poutine delicacy'
            },
            {
                // 12
                storeId: 4,
                name: 'Poutine messy italiano',
                imageUrl: 'https://live.staticflickr.com/2291/2312748804_ea87523dee_b.jpg',
                description: 'This delicious mess of poutine comes with an italian tomato gravy sauce that is too good to pass up!'
            },
            {
                // 13
                storeId: 4,
                name: 'Bacon poutina',
                imageUrl: 'https://live.staticflickr.com/1261/1387280481_430dc4c3d9_b.jpg',
                description: 'The ladies are sure to love this saucy plate of poutine smothered with gravy and bacon!'
            },
            {
                // 14
                storeId: 5,
                name: 'Poutine the right way',
                imageUrl: 'https://live.staticflickr.com/7723/28016005510_463ffa9740_b.jpg',
                description: 'Our "Poutine the right way" has a fat old egg on top. That\'s right..the right way.'
            },
            {
                // 15
                storeId: 6,
                name: 'Bag\'o Poutine',
                imageUrl: 'https://live.staticflickr.com/5574/15043889670_8930384083.jpg',
                description: 'It\'s just what it looks like. A bag of poutine. Enjoy before the bag gets soggy...'
            },
            {
                // 16
                storeId: 6,
                name: 'Grand Poutine',
                imageUrl: 'https://live.staticflickr.com/3886/14170289748_efcaf14f6c_b.jpg',
                description: 'Our Grand Poutine will have you comeing back for more!'
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete('Poutines', null, {truncate: true, cascade: true, restartIdentity: true});
    }
};
