const bcrypt = require('bcrypt');
const validator = require('validator');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
       
    });

    Users.beforeCreate((user) => {
        return bcrypt.hash(user.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                user.password = hash;
            });
    });

    Users.beforeBulkUpdate((user) => {
        if (user.attributes.password) {
            return bcrypt.hash(user.attributes.password, process.env.BCRYPT_SALT_ROUNDS || 10)
                .then((hash) => {
                    user.attributes.password = hash;
                });
        }
    });
    Users.hook('beforeValidate', function (user) {

        if (validator.isEmail(user.email)) {
            return sequelize.Promise.resolve(user);
        } else {
            throw new Error('Validation Error: invalid email');
        }
    });
   
    // Users.associate = (models) => {
    //     Users.belongsTo(models.Condominiums, {
    //         foreignKey: {
    //             name: 'cnpj',
    //             as: 'condominiumCnpj'
    //         },
    //         onDelete: 'set null'
    //     });
    // };
    return Users;
};

