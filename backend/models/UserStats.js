module.exports = (sequelize, DataTypes) => {
    const UserStats = sequelize.define('UserStats', {
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        mostKills: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        mostMoney: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        longestGame: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName: 'UserStats'
    });

    UserStats.associate = (models) => {
        UserStats.belongsTo(models.User, {
            foreignKey: 'userID',
            as: 'user'
        });
    };

    return UserStats;
};