const {DataTypes, Model } = require('sequelize');
const sequelize = require('../index')

class WeiboUser extends Model {}

WeiboUser.init({
  id:{
    type:DataTypes.STRING,
    primaryKey: true,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull:false
  },
  avatar:{
    type:DataTypes.STRING,
    allowNull:false
  },
  isAdmin:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue:0
  }
}, {
  sequelize,
  modelName: 'weibo_user',
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
  indexes:[
    {
      unique: true,
      fields: ['nickname']
    }
  ]
});

;(async () => {
  await sequelize.sync({ alter: true });
})();

module.exports =  WeiboUser