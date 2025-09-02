<template>
  <div class="min-h-screen bg-gray-50">
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
            <router-link to="/login" class="hover:text-emerald-200">เข้าสู่ระบบ</router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="min-h-screen flex items-center justify-center px-4 py-12 mt-16">
      <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div class="text-center mb-8">
          <div class="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-white text-2xl">🍽️</span>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">สมัครสมาชิก</h2>
          <p class="text-gray-600">สร้างบัญชีใหม่เพื่อเริ่มวางแผนอาหารของคุณ</p>
        </div>
        
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">ชื่อ</label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="ชื่อจริง"
              >
            </div>
            
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">นามสกุล</label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="นามสกุล"
              >
            </div>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="example@email.com"
            >
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="080-000-0000"
              @input="formatPhoneNumber"
            >
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">รหัสผ่าน</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pr-12"
                placeholder="รหัสผ่านอย่างน้อย 8 ตัวอักษร"
                @input="checkPasswordStrength"
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
            
            <!-- Password Strength Indicator -->
            <div v-if="form.password" class="mt-2">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  :class="[
                    'h-2 rounded-full transition-all duration-300',
                    passwordStrength === 'weak' ? 'bg-red-500 w-1/4' :
                    passwordStrength === 'medium' ? 'bg-yellow-500 w-1/2' :
                    passwordStrength === 'good' ? 'bg-blue-500 w-3/4' :
                    passwordStrength === 'strong' ? 'bg-green-500 w-full' : 'bg-gray-300 w-0'
                  ]"
                ></div>
              </div>
              <p :class="[
                'text-xs mt-1',
                passwordStrength === 'weak' ? 'text-red-600' :
                passwordStrength === 'medium' ? 'text-yellow-600' :
                passwordStrength === 'good' ? 'text-blue-600' :
                passwordStrength === 'strong' ? 'text-green-600' : 'text-gray-600'
              ]">
                ความแข็งแกร่งของรหัสผ่าน: {{ getStrengthText() }}
              </p>
            </div>
          </div>
          
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">ยืนยันรหัสผ่าน</label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pr-12"
                placeholder="ยืนยันรหัสผ่านอีกครั้ง"
                @input="checkPasswordMatch"
              >
              <button
                type="button"
                @click="toggleConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="showConfirmPassword" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
            </div>
            
            <!-- Password Match Indicator -->
            <div v-if="form.confirmPassword" class="mt-2">
              <p v-if="passwordMatch" class="text-sm text-green-600 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                รหัสผ่านตรงกัน
              </p>
              <p v-if="passwordMismatch" class="text-sm text-red-600 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                รหัสผ่านไม่ตรงกัน
              </p>
            </div>
          </div>
          
          <!-- Social Login -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">หรือสมัครด้วย</span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <svg class="w-5 h-5 text-red-500" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span class="ml-2">Google</span>
              </button>

              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span class="ml-2">Facebook</span>
              </button>
            </div>
          </div>
          
          <div class="flex items-center">
            <input
              id="terms"
              v-model="form.acceptTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            >
            <label for="terms" class="ml-2 block text-sm text-gray-700">
              ฉันยอมรับ
              <a href="#" class="text-emerald-600 hover:text-emerald-500">ข้อตกลงการใช้งาน</a>
              และ
              <a href="#" class="text-emerald-600 hover:text-emerald-500">นโยบายความเป็นส่วนตัว</a>
            </label>
          </div>
          
          <button
            type="submit"
            :disabled="!canSubmit"
            class="w-full gradient-bg text-white py-3 px-4 rounded-lg hover:opacity-90 focus:ring-4 focus:ring-emerald-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            สมัครสมาชิก
          </button>
          
          <div class="text-center">
            <p class="text-gray-600">
              มีบัญชีอยู่แล้ว?
              <router-link to="/login" class="text-emerald-600 hover:text-emerald-500 font-medium">
                เข้าสู่ระบบ
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)
    const passwordStrength = ref('')
    const passwordMatch = ref(false)
    const passwordMismatch = ref(false)
    
    const form = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    })
    
    const canSubmit = computed(() => {
      return form.value.firstName &&
             form.value.lastName &&
             form.value.email &&
             form.value.phone &&
             form.value.password &&
             form.value.confirmPassword &&
             passwordMatch.value &&
             form.value.acceptTerms
    })
    
    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }
    
    const toggleConfirmPassword = () => {
      showConfirmPassword.value = !showConfirmPassword.value
    }
    
    const formatPhoneNumber = (event) => {
      let value = event.target.value.replace(/\D/g, '') // Remove non-digits
      
      if (value.length > 0) {
        if (value.length <= 3) {
          value = value
        } else if (value.length <= 6) {
          value = value.slice(0, 3) + '-' + value.slice(3)
        } else {
          value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10)
        }
      }
      
      form.value.phone = value
    }
    
    const checkPasswordStrength = () => {
      const password = form.value.password
      let score = 0
      
      if (password.length >= 8) score++
      if (/[a-z]/.test(password)) score++
      if (/[A-Z]/.test(password)) score++
      if (/[0-9]/.test(password)) score++
      if (/[^A-Za-z0-9]/.test(password)) score++
      
      if (score <= 2) passwordStrength.value = 'weak'
      else if (score === 3) passwordStrength.value = 'medium'
      else if (score === 4) passwordStrength.value = 'good'
      else passwordStrength.value = 'strong'
      
      checkPasswordMatch()
    }
    
    const checkPasswordMatch = () => {
      if (form.value.confirmPassword) {
        passwordMatch.value = form.value.password === form.value.confirmPassword
        passwordMismatch.value = !passwordMatch.value
      } else {
        passwordMatch.value = false
        passwordMismatch.value = false
      }
    }
    
    const getStrengthText = () => {
      switch (passwordStrength.value) {
        case 'weak': return 'อ่อน'
        case 'medium': return 'ปานกลาง'
        case 'good': return 'ดี'
        case 'strong': return 'แข็งแกร่ง'
        default: return ''
      }
    }
    
    const handleRegister = () => {
      if (canSubmit.value) {
        // Simulate registration process
        console.log('Registration data:', form.value)
        alert('สมัครสมาชิกสำเร็จ!')
        router.push('/login')
      }
    }
    
    return {
      form,
      showPassword,
      showConfirmPassword,
      passwordStrength,
      passwordMatch,
      passwordMismatch,
      canSubmit,
      togglePassword,
      toggleConfirmPassword,
      formatPhoneNumber,
      checkPasswordStrength,
      checkPasswordMatch,
      getStrengthText,
      handleRegister
    }
  }
}
</script>

<style scoped>
.auth-container {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
}

.password-input-wrapper {
  position: relative;
}

.password-toggle {
  cursor: pointer;
}

.form-card {
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.strength-meter {
  width: 100%;
  height: 4px;
  background-color: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.strength-meter-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-text {
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.weak { 
  background-color: #ef4444; 
  width: 25%; 
}

.medium { 
  background-color: #f59e0b; 
  width: 50%; 
}

.good { 
  background-color: #3b82f6; 
  width: 75%; 
}

.strong { 
  background-color: #22c55e; 
  width: 100%; 
}

.gradient-bg {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
}

.social-btn {
  transition: all 0.2s ease;
}

.social-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

input:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}
</style>
