const bcrypt = require('bcrypt');
const validator = require('validator');

module.exports = (sequelize, DataTypes) => {
    const Realties = sequelize.define('Realties', {
        name: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.STRING,
        zipCode: DataTypes.STRING,
        neighborhood: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        literCost: DataTypes.STRING
    });

    Realties.associate = (models) => {
        Realties.belongsTo(models.Users, {
            foreignKey: {
                name: 'id',
                as: 'userId'
            },
            onDelete: 'set null'
        });
    };

    return Realties;
};

