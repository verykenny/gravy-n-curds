'use strict';
module.exports = (sequelize, DataTypes) => {
    const Checkin = sequelize.define('Checkin', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        poutineId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
        },
        rating: {
            type: DataTypes.INTEGER,
        },
    }, {});
    Checkin.associate = function (models) {
        // associations can be defined here
        Checkin.belongsTo(models.User, { foreignKey: 'userId' });
        Checkin.belongsTo(models.Poutine, { foreignKey: 'poutineId' });
    };
    return Checkin;
};
