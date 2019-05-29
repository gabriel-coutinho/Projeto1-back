module.exports = (sequelize, DataTypes) => {
    const Zones = sequelize.define('Zones', {
        name: DataTypes.STRING
    });

    Zones.associate = (models) => {
        Zones.belongsTo(models.Realties, {
            foreignKey: {
                name: 'id',
                as: 'realtyId'
            },
            onDelete: 'set null'
        });
    };

    return Zones;
};
