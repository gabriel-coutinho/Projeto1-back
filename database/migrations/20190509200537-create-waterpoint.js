'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return  queryInterface.createTable('Waterpoint', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
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
        queryInterface.dropTable('Waterpoint');
    }
};





