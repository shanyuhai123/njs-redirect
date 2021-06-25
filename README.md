# NJS-REDIRECT

> NJS-REDIRECT 仍在积极开发中，用法尚未稳定。



## 使用
### 1. 修改环境变量

打开 `.env` 文件，修改为你的信息。

### 2. 生成配置文件

修改完 `.env` 文件后，执行 `bash setup.sh` 生成配置文件。

### 3. 启动服务

启动服务：

```bash
docker-compose up -d
```

如果你是 `traefik` 用户则可以执行：

```bash
docker-compose -f docker-compose.traefik.yml up -d
```



## 挖坑

1. 完成 local（由于是算法苦手，该部分还在进行中）
2. 更多的服务商支持



## 相关资料

+ [njs docs](http://nginx.org/en/docs/njs/)
+ [njs examples](http://nginx.org/en/docs/njs/examples.html)
