<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>用户登录</v-toolbar-title>
          </v-toolbar>
          
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="loginForm.email"
                :rules="emailRules"
                label="邮箱地址"
                prepend-icon="mdi-email"
                required
                outlined
                class="mb-3"
              ></v-text-field>
              
              <v-text-field
                v-model="loginForm.password"
                :rules="passwordRules"
                label="密码"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                required
                outlined
                class="mb-3"
              ></v-text-field>
              
              <v-checkbox
                v-model="rememberMe"
                label="记住我"
                class="mb-3"
              ></v-checkbox>
            </v-form>
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              :loading="loading"
              color="primary"
              @click="handleLogin"
              block
              large
            >
              登录
            </v-btn>
          </v-card-actions>
          
          <!-- 响应信息显示 -->
          <v-card-text v-if="responseMessage">
            <v-alert
              :type="responseType"
              dismissible
              @input="clearResponse"
            >
              <div>
                <strong>响应状态:</strong> {{ responseStatus }}<br>
                <strong>响应消息:</strong> {{ responseMessage }}<br>
                <strong>响应时间:</strong> {{ responseTime }}
              </div>
              <v-divider class="my-2"></v-divider>
              <div v-if="responseData">
                <strong>响应数据:</strong>
                <pre class="mt-2">{{ JSON.stringify(responseData, null, 2) }}</pre>
              </div>
            </v-alert>
          </v-card-text>
          
          <!-- 测试用例快捷按钮 -->
          <v-card-text>
            <v-divider class="mb-3"></v-divider>
            <div class="text-subtitle2 mb-2">测试用例:</div>
            <v-row>
              <v-col cols="12" sm="6">
                <v-btn
                  @click="fillTestCase1"
                  color="success"
                  variant="outlined"
                  size="small"
                  block
                >
                  成功案例
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn
                  @click="fillTestCase2"
                  color="error"
                  variant="outlined"
                  size="small"
                  block
                >
                  失败案例
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { loginApi } from '@/api/auth'

export default {
  name: 'LoginPage',
  data() {
    return {
      valid: false,
      loading: false,
      showPassword: false,
      rememberMe: false,
      responseMessage: '',
      responseType: 'info',
      responseStatus: '',
      responseTime: '',
      responseData: null,
      loginForm: {
        email: '',
        password: ''
      },
      emailRules: [
        v => !!v || '邮箱不能为空',
        v => /.+@.+\..+/.test(v) || '请输入有效的邮箱地址'
      ],
      passwordRules: [
        v => !!v || '密码不能为空'
      ]
    }
  },
  methods: {
    async handleLogin() {
      if (!this.$refs.form.validate()) {
        return
      }
      
      this.loading = true
      this.clearResponse()
      
      const startTime = new Date()
      
      try {
        console.log('发送登录请求:', this.loginForm)
        const response = await loginApi(this.loginForm)
        const endTime = new Date()
        
        console.log('登录响应:', response)
        
        this.responseTime = `${endTime - startTime}ms`
        this.responseStatus = response.code || 'Unknown'
        this.responseData = response.data
        
        // 根据接口文档处理响应
        if (response.code === 200) {
          this.responseType = 'success'
          this.responseMessage = response.message || '登录成功'
          
          // 存储token和用户信息
          if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userInfo', JSON.stringify(response.data))
          }
        } else {
          this.responseType = 'error'
          this.responseMessage = response.message || '登录失败'
        }
      } catch (error) {
        const endTime = new Date()
        this.responseTime = `${endTime - startTime}ms`
        this.responseType = 'error'
        this.responseStatus = 'Network Error'
        this.responseMessage = error.message || '网络错误，请稍后重试'
        console.error('登录错误:', error)
      } finally {
        this.loading = false
      }
    },
    
    clearResponse() {
      this.responseMessage = ''
      this.responseType = 'info'
      this.responseStatus = ''
      this.responseTime = ''
      this.responseData = null
    },
    
    // 填充测试用例1 - 成功场景
    fillTestCase1() {
      this.loginForm.email = '12345678@example.com'
      this.loginForm.password = '12345678'
      this.clearResponse()
    },
    
    // 填充测试用例2 - 失败场景
    fillTestCase2() {
      this.loginForm.email = 'nonexistent@example.com'
      this.loginForm.password = 'Test1234'
      this.clearResponse()
    }
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

pre {
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
}
</style>