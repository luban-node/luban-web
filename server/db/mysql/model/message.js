const { DataTypes, Model } = require('sequelize');
const sequelize = require('../index')
const User = require('./user')
const WeiboUser = require('./weiboUser')

class Message extends Model {}

Message.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    userType: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'message',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

User.hasMany(Message, {
    foreignKey: 'userId',
    constraints: false,
    scope: {
        userType: 'user'
    }
})

WeiboUser.hasMany(Message, {
    foreignKey: 'userId',
    constraints: false,
    scope: {
        userType: 'weiboUser'
    }
})

Message.belongsTo(User, { foreignKey: 'userId', constraints: false })
Message.belongsTo(WeiboUser, { foreignKey: 'userId', constraints: false });

; (async () => {
    await sequelize.sync({ alter: true });
})();

module.exports = Message