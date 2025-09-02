<template>
  <div class="min-h-screen bg-emerald-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <!-- Navbar -->
    <nav class="bg-emerald-800 text-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span class="text-emerald-800 font-bold text-lg">🍽️</span>
            </div>
            <span class="text-xl font-bold">FoodPlan</span>
          </router-link>
          
          <div class="hidden md:flex space-x-6">
            <a href="#" class="hover:text-emerald-200">เกี่ยวกับเรา</a>
            <a href="#" class="hover:text-emerald-200">ติดต่อ</a>
            <router-link to="/register" class="hover:text-emerald-200">สมัครสมาชิก</router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg mt-16">
      <div class="text-center">
        <div class="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-white text-2xl">🍽️</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">เข้าสู่ระบบ</h2>
        <p class="text-gray-600">ยินดีต้อนรับกลับ! กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            อีเมลหรือเบอร์โทรศัพท์
          </label>
          <input
            id="email"
            v-model="form.email"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="กรอกอีเมลหรือเบอร์โทรศัพท์"
          >
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            รหัสผ่าน
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors pr-12"
              placeholder="กรอกรหัสผ่าน"
            >
            <button
              type="button"
              @click="togglePassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg v-if="showPassword" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            >
            <label for="remember" class="ml-2 block text-sm text-gray-700">
              จดจำการเข้าสู่ระบบ
            </label>
          </div>
          
          <router-link to="/reset-password" class="text-sm text-emerald-600 hover:text-emerald-500">
            ลืมรหัสผ่าน?
          </router-link>
        </div>
        
        <button
          type="submit"
          :disabled="loading"
          class="w-full gradient-bg text-white py-3 px-4 rounded-lg hover:opacity-90 focus:ring-4 focus:ring-emerald-200 transition-all disabled:opacity-50"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            กำลังเข้าสู่ระบบ...
          </span>
          <span v-else>เข้าสู่ระบบ</span>
        </button>
        
        <div class="text-center">
          <p class="text-gray-600">
            ยังไม่มีบัญชี?
            <router-link to="/register" class="text-emerald-600 hover:text-emerald-500 font-medium">
              สมัครสมาชิกเลย
            </router-link>
          </p>
        </div>
      </form>
      
      <!-- Social Login -->
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">หรือเข้าสู่ระบบด้วย</span>
          </div>
        </div>
        
        <div class="mt-6 grid grid-cols-2 gap-3">
          <button class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="ml-2">Google</span>
          </button>
          
          <button class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span class="ml-2">Facebook</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const showPassword = ref(false)
    
    const form = ref({
      email: '',
      password: '',
      remember: false
    })
    
    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }
    
    const handleLogin = async () => {
      loading.value = true
      
      // Simulate API call
      setTimeout(() => {
        loading.value = false
        // Redirect to home page after successful login
        router.push('/')
      }, 1500)
    }
    
    return {
      form,
      loading,
      showPassword,
      togglePassword,
      handleLogin
    }
  }
}
</script>
