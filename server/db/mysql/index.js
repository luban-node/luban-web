const { Sequelize } = require('sequelize');
const { mysqlConfig } = require('../../config')
const sequelize = new Sequelize(mysqlConfig.url, {
  pool: mysqlConfig.pool, dialectOptions: {
    dateStrings: true,
    typeCast: true
  }, timezone: '+08:00'
});

; (async () => {
  try {
    await sequelize.authenticate();
    console.log(`mysql连接成功:${mysqlConfig.url}`);
  } catch (error) {
    console.error('mysql连接失败', error);
  }
})();

module.exports = sequelize 