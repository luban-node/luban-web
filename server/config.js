const isDev = process.env.NODE_ENV === 'development'
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
    redisConfig: {
        url: 'redis://:rst200233@localhost:6379/0'
    },
    jwtConfig: {
        key: 'luban-web-selenium39',
        expire: 60 * 60 * 4
    },
    weiboConfig: {
        appKey: '3359969474',
        appSecret: '66221ecc946712b9fb9e5243caddff71',
        redirectUrl: isDev ? 'http://127.0.0.1:8080/login' : 'http://lolmbbs.com/login'
    },
    noLoginApi: ['/api/qr/create', '/api/wm/dy', '/api/upload/image', '/api/ocr', '/api/register', '/api/login']
}