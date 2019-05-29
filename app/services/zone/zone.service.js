const models = require('../../models');
const bcrypt = require('bcrypt');
const omitEmpty = require('omit-empty');

module.exports = {

    showAsyncById: (id) => {
        return models.Zones.findById(id);
    },

    createAsync: (data) => {
        return models.Zones.create(data);
    },
        
    showAllAsync: () => {
        return models.Zones.findAll();

    },

    destroyAsync: (id) => {
        return models.Zones.destroy({where: {id}});
    },

    createAsync: (data) => {
        return models.Zones.create(data);
    }
};