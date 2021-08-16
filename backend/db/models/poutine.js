'use strict';
module.exports = (sequelize, DataTypes) => {
    const Poutine = sequelize.define('Poutine', {
        storeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 30]
            }
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [3, 500]
            }
        },
    }, {});
    Poutine.associate = function (models) {
        // associations can be defined here
    };
    return Poutine;
};
