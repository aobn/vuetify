import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://117.72.154.155:8080' 
    : (import.meta.env.VITE_API_BASE_URL || ''), 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 可以在这里添加token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // CORS头部由后端服务器处理，前端不需要设置
    
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response
      switch (status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')
          break
        case 403:
          console.error('权限不足')
          break
        case 500:
          console.error('服务器内部错误')
          break
        default:
          console.error('请求错误:', data?.message || error.message)
      }
      return Promise.reject(new Error(data?.message || '请求失败'))
    } else if (error.request) {
      // 网络错误
      return Promise.reject(new Error('网络连接失败，请检查网络'))
    } else {
      return Promise.reject(error)
    }
  }
)

/**
 * 用户登录接口
 * @param {Object} loginData - 登录数据
 * @param {string} loginData.email - 邮箱地址
 * @param {string} loginData.password - 密码
 * @returns {Promise} 登录响应
 */
export const loginApi = (loginData) => {
  return api.post('/api/auth/login', loginData)
}

export default api