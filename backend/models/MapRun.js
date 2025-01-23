module.exports = (sequelize, DataTypes) => {
    const MapRun = sequelize.define('MapRun', {
        mapID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Maps',
                key: 'id'
            }
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        kills: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        time: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        money: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        waves: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    MapRun.associate = (models) => {
        MapRun.belongsTo(models.Map, {
            foreignKey: 'mapID',
            as: 'map'
        });
        MapRun.belongsTo(models.User, {
            foreignKey: 'userID',
            as: 'user'
        });
    };

    return MapRun;
};