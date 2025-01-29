module.exports = (sequelize, DataTypes) => {
    const Map = sequelize.define('Map', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        JSON: {
            type: DataTypes.JSON,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.STRING,
            allowNull: false
        },
        waves: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'maps',
        timestamps: false
    });

    Map.associate = (models) => {
        Map.hasMany(models.MapRun, {
            foreignKey: 'mapID',
            as: 'mapRuns'
        });
    };

    return Map;
};