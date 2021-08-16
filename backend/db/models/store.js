'use strict';
module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 30]
            }
        }
    }, {});
    Store.associate = function (models) {
        // associations can be defined here
        Store.belongsTo(models.User, { foreignKey: 'ownerId' });
        Store.hasMany(models.Poutine, { foreignKey: 'storeId' })
    };
    return Store;
};
