'use strict';
module.exports = (sequelize, DataTypes) => {
    const Poutine = sequelize.define('Poutine', {
        storeId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {});
    Poutine.associate = function (models) {
        // associations can be defined here
    };
    return Poutine;
};
