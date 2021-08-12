'use strict';
module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        ownerId: DataTypes.INTEGER,
        name: DataTypes.STRING
    }, {});
    Store.associate = function (models) {
        // associations can be defined here
    };
    return Store;
};
