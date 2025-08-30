#!/bin/bash

# EdgeOne Pages 部署脚本

echo "开始构建项目..."

# 安装依赖
npm install

# 构建生产版本
npm run build

echo "构建完成！"
echo "请将 dist 目录上传到 EdgeOne Pages"
echo ""
echo "部署步骤："
echo "1. 登录腾讯云 EdgeOne 控制台"
echo "2. 进入 Pages 服务"
echo "3. 创建新站点或更新现有站点"
echo "4. 上传 dist 目录中的所有文件"
echo "5. 配置自定义域名（可选）"
echo ""
echo "注意事项："
echo "- 确保后端API服务器支持CORS跨域请求"
echo "- API服务器地址: http://117.72.154.155:8080"