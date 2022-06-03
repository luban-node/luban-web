FROM node:14
MAINTAINER Selenium39

ENV APP_DIR /usr/local/src/luban-web

# debian换源
RUN sed -i s/deb.debian.org/mirrors.aliyun.com/g /etc/apt/sources.list && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
RUN apt-get clean \
    && apt-get update

#安装web应用
WORKDIR ${APP_DIR}
COPY . .
RUN npm config set registry http://registry.npm.taobao.org
# 编译前端
WORKDIR ${APP_DIR}/client
RUN npm install \
    && npm run prod
# 编译后端
WORKDIR ${APP_DIR}/server
RUN npm install \
    && npm install -g pm2
EXPOSE 3000
CMD ["sh" ,"-c" ,"npm run prod | pm2 logs" ]


