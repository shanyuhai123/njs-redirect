FROM node:14.4.0

# 指定用户、目录
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
EXPOSE 8080

# COPY lock 仅安装生产依赖
COPY --chown=node:node . .
RUN yarn install --frozen-lockfile --production

# 运行
CMD ["node", "app"]