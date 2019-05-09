const models = require('../../models');
const bcrypt = require('bcrypt');
const omitEmpty = require('omit-empty');

module.exports = {
    verifyCredentialsAsync: (email, password) => {
        if (email && password) {
            return models.Users.find({where: {email}}).then((data) => {
                if (data) {
                    const isValidPassword = bcrypt.compareSync(password, data.password);
                    if (isValidPassword) {
                        return data;
                    }
                }
                return false;
            });
        }
        return false;
    },
    showAsync: (email) => {
        return models.Users.findOne({where: {'email': email}})

    },
    showAllAsync: () => {
        return models.Users.findAll();

    },
    destroyAsync: (id) => {
        return models.Users.destroy({where: {id}});
    },
    createAsync: (data) => {
        return models.Users.create(data);
    },
    updateAsync: (email, data) => {
        delete data.email;
        const user = omitEmpty(data);
        return models.Users.update(user, {where: {email}})
            .then(result => {
                const isWork = result[0];
                return isWork;
            });
    }
};
