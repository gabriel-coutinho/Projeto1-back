const models = require('../../models');
const bcrypt = require('bcrypt');
const omitEmpty = require('omit-empty');

module.exports = {

    showAsyncById: (id) => {
        return models.Realties.findById(id);
    },

    createAsync: (data) => {
        return models.Realties.create(data);
    },
        
    showAllAsync: () => {
        return models.Realties.findAll();

    },

    destroyAsync: (id) => {
        return models.Realties.destroy({where: {id}});
    },

    createAsync: (data) => {
        return models.Realties.create(data);
    }
};
