module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        heslo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'Users',
        timestamps: false
    });

    User.associate = (models) => {
        User.hasMany(models.UserStats, {
            foreignKey: 'userID',
            as: 'stats'
        });
        User.hasMany(models.MapRun, {
            foreignKey: 'userID',
            as: 'mapRuns'
        });
    };

    return User;
};