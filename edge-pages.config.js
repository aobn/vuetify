// EdgeOne Pages 配置文件
export default {
  // 构建输出目录
  build: {
    outDir: 'dist'
  },
  
  // 路由配置
  routes: [
    {
      src: '/.*',
      dest: '/index.html'
    }
  ],
  
  // 环境变量
  env: {
    VITE_API_BASE_URL: 'http://117.72.154.155:8080'
  },
  
  // 头部配置，处理CORS
  headers: [
    {
      source: '/api/(.*)',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: '*'
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET, POST, PUT, DELETE, OPTIONS'
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'Content-Type, Authorization'
        }
      ]
    }
  ]
}