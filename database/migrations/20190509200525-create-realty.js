'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return  queryInterface.createTable('Realty', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                allowNull: false,
                type: DataTypes.String
            },
            street: {
                allowNull: false,
                type: DataTypes.String
            },
            number: {
                allowNull: false,
                type: DataTypes.String
            },
            zipCode: {
                allowNull: false,
                type: DataTypes.String
            },
            neighborhood: {
                allowNull: false,
                type: DataTypes.String
            },
            city: {
                allowNull: false,
                type: DataTypes.String
            },
            state: {
                allowNull: false,
                type: DataTypes.String
            },
            literCost: {
                allowNull: false,
                type: DataTypes.String
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },

    down: (queryInterface) => {
        queryInterface.dropTable('Realty');
    }
};





