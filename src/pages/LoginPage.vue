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
              {{ responseMessage }}
            </v-alert>
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
      
      try {
        const response = await loginApi(this.loginForm)
        
        // 根据接口文档处理响应
        if (response.code === 200) {
          this.responseType = 'success'
          this.responseMessage = response.message || '登录成功'
          
          // 存储token和用户信息
          if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo))
          }
          
          // 可以在这里跳转到其他页面
          // this.$router.push('/dashboard')
        } else {
          this.responseType = 'error'
          this.responseMessage = response.message || '登录失败'
        }
      } catch (error) {
        this.responseType = 'error'
        this.responseMessage = error.message || '网络错误，请稍后重试'
        console.error('登录错误:', error)
      } finally {
        this.loading = false
      }
    },
    
    clearResponse() {
      this.responseMessage = ''
      this.responseType = 'info'
    }
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>