<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6">
          <v-card-title class="text-h4 text-center mb-4">
            Vuetify 项目首页
          </v-card-title>
          
          <v-card-text class="text-center">
            <p class="text-h6 mb-4">欢迎使用 Vuetify 3.x 开发框架</p>
            
            <v-divider class="my-4"></v-divider>
            
            <div class="mb-4">
              <h3 class="mb-2">功能测试</h3>
              <v-btn
                to="/login"
                color="primary"
                size="large"
                prepend-icon="mdi-login"
                class="ma-2"
              >
                登录页面测试
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  //
</script>
