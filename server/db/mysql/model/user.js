const {DataTypes, Model } = require('sequelize');
const sequelize = require('../index')

class User extends Model {}

User.init({
  id:{
    type:DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  nickname: {
    type: DataTypes.STRING,
    allowNull:false
  },
  password:{
     type:DataTypes.STRING,
     allowNull:false
  },
  salt:{
    type:DataTypes.STRING,
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
  modelName: 'user',
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
  indexes:[
    {
      unique: true,
      fields: ['email','nickname']
    }
  ]
});

;(async () => {
  await sequelize.sync({ alter: true });
})();

module.exports =  User