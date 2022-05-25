module.exports = {
    mysqlConfig: {
        url: 'mysql://localhost:3306/luban?user=root&password=rst200233',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    redisConfig:{
        url:'redis://:rst200233@localhost:6379/0'
    },
    jwtConfig:{
        key:'luban-web-selenium39',
        expire:60*60*4
    },
    noLoginApi:['/api/qr/create','/api/wm/dy','/api/upload/image','/api/ocr','/api/register','/api/login']
}