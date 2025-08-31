# EdgeOne Pages 部署指南

## 项目概述
这是一个基于 Vue 3 + Vuetify 3 的登录页面项目，需要部署到腾讯云 EdgeOne Pages 静态托管服务。

## 部署步骤

### 1. 本地构建
```bash
# 安装依赖
npm install

# 构建生产版本
npm run build
```

### 2. EdgeOne Pages 部署
1. 登录 [腾讯云 EdgeOne 控制台](https://console.cloud.tencent.com/edgeone)
2. 进入 Pages 服务
3. 创建新站点或选择现有站点
4. 上传 `dist` 目录中的所有文件
5. 配置路由规则（SPA应用需要配置）

### 3. 路由和代理配置
在 EdgeOne Pages 控制台中配置以下规则：

**路由规则：**
```
/api/* -> http://117.72.154.155:8080/api/:splat (200)
/* -> /index.html (200)
```

**或者使用配置文件：**
项目已包含 `public/_redirects` 和 `public/_headers` 文件，EdgeOne Pages会自动识别这些配置。

### 4. 环境变量配置
确保以下环境变量正确设置：
- `VITE_API_BASE_URL`: http://117.72.154.155:8080

## CORS 跨域问题解决方案

项目已配置了多种解决方案：

### 方案1：EdgeOne Pages 代理（推荐）
- 使用 `public/_redirects` 文件配置API代理
- 将 `/api/*` 请求自动转发到后端服务器
- 避免浏览器CORS限制

### 方案2：EdgeOne Pages 头部配置
- 使用 `public/_headers` 文件配置CORS头部
- 自动添加必要的跨域头部信息

### 方案3：后端配置CORS（备选）
如果以上方案不可用，可在后端API服务器添加CORS头部：
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## 测试用例
部署完成后，可以使用以下测试用例验证登录功能：

**成功案例：**
- 邮箱: 12345678@example.com
- 密码: 12345678

**失败案例：**
- 邮箱: nonexistent@example.com  
- 密码: Test1234

## 访问地址
- 登录页面: https://your-domain.com/login
- 首页: https://your-domain.com/

## 注意事项
1. 确保API服务器 https://db.goxi.top:8080 可以正常访问
2. 检查API服务器的CORS配置
3. 如果遇到跨域问题，请联系后端开发人员配置CORS
4. EdgeOne Pages 支持自定义域名绑定