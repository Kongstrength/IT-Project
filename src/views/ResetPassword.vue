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

    <div class="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <!-- Step Indicator -->
        <div class="flex items-center justify-center mb-8">
          <div class="flex items-center">
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors', 
                          currentStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-600']">1</div>
            <div :class="['w-16 h-1 transition-colors', currentStep >= 2 ? 'bg-emerald-600' : 'bg-gray-300']"></div>
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors', 
                          currentStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-600']">2</div>
            <div :class="['w-16 h-1 transition-colors', currentStep >= 3 ? 'bg-emerald-600' : 'bg-gray-300']"></div>
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors', 
                          currentStep >= 3 ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-600']">3</div>
            <div :class="['w-16 h-1 transition-colors', currentStep >= 4 ? 'bg-emerald-600' : 'bg-gray-300']"></div>
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors', 
                          currentStep >= 4 ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-600']">4</div>
          </div>
        </div>

        <div class="bg-white p-8 rounded-xl shadow-lg">
          <!-- Step 1: Email Input -->
          <div v-if="currentStep === 1" class="slide-transition">
            <div class="text-center mb-6">
              <div class="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">ลืมรหัสผ่าน?</h2>
              <p class="text-gray-600">กรอกอีเมลของคุณเพื่อรับลิงก์รีเซ็ตรหัสผ่าน</p>
            </div>
            
            <form @submit.prevent="sendResetEmail" class="space-y-4">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                <div class="input-group">
                  <div class="input-icon">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="input-with-icon w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="กรอกอีเมลของคุณ"
                  >
                </div>
              </div>
              
              <button
                type="submit"
                class="w-full gradient-bg text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 focus:ring-4 focus:ring-emerald-200 transition-all"
              >
                ส่งลิงก์รีเซ็ตรหัสผ่าน
              </button>
            </form>
            
            <div class="text-center mt-6">
              <router-link to="/login" class="text-emerald-600 hover:text-emerald-500 text-sm">
                ← กลับไปเข้าสู่ระบบ
              </router-link>
            </div>
          </div>

          <!-- Step 2: Verification Code -->
          <div v-if="currentStep === 2" class="slide-transition">
            <div class="text-center mb-6">
              <div class="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">ยืนยันรหัส</h2>
              <p class="text-gray-600">เราได้ส่งรหัสยืนยัน 6 หลักไปยัง <span class="font-medium">{{ form.email }}</span></p>
            </div>
            
            <form @submit.prevent="verifyCode" class="space-y-4">
              <div>
                <label for="verificationCode" class="block text-sm font-medium text-gray-700 mb-2">รหัสยืนยัน</label>
                <div class="flex space-x-2">
                  <input
                    v-for="(digit, index) in verificationDigits"
                    :key="index"
                    v-model="verificationDigits[index]"
                    type="text"
                    maxlength="1"
                    class="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
                    @input="moveToNext($event, index)"
                    @keydown="handleKeydown($event, index)"
                  >
                </div>
              </div>
              
              <button
                type="submit"
                :disabled="!isCodeComplete"
                class="w-full gradient-bg text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 focus:ring-4 focus:ring-emerald-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ยืนยันรหัส
              </button>
            </form>
            
            <div class="text-center mt-6">
              <p class="text-sm text-gray-600">
                ไม่ได้รับรหัส? 
                <button 
                  @click="resendCode" 
                  :disabled="resendTimer > 0"
                  class="text-emerald-600 hover:text-emerald-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {{ resendTimer > 0 ? `ส่งใหม่ใน ${resendTimer} วินาที` : 'ส่งรหัสใหม่' }}
                </button>
              </p>
            </div>
          </div>

          <!-- Step 3: New Password -->
          <div v-if="currentStep === 3" class="slide-transition">
            <div class="text-center mb-6">
              <div class="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">ตั้งรหัสผ่านใหม่</h2>
              <p class="text-gray-600">กรุณาตั้งรหัสผ่านใหม่ที่แข็งแกร่งและปลอดภัย</p>
            </div>
            
            <form @submit.prevent="resetPassword" class="space-y-4">
              <div>
                <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">รหัสผ่านใหม่</label>
                <div class="relative">
                  <input
                    id="newPassword"
                    v-model="form.newPassword"
                    :type="showNewPassword ? 'text' : 'password'"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pr-12"
                    placeholder="รหัสผ่านใหม่อย่างน้อย 8 ตัวอักษร"
                    @input="checkPasswordStrength"
                  >
                  <button
                    type="button"
                    @click="toggleNewPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg v-if="showNewPassword" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                    </svg>
                  </button>
                </div>
                
                <!-- Password Strength Indicator -->
                <div v-if="form.newPassword" class="mt-2">
                  <div class="password-strength w-full bg-gray-200 rounded-full h-2">
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
                    'password-strength-text text-xs mt-1',
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
                <label for="confirmNewPassword" class="block text-sm font-medium text-gray-700 mb-2">ยืนยันรหัสผ่านใหม่</label>
                <div class="relative">
                  <input
                    id="confirmNewPassword"
                    v-model="form.confirmNewPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pr-12"
                    placeholder="ยืนยันรหัสผ่านใหม่"
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
                <div v-if="form.confirmNewPassword" class="mt-2">
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
              
              <button
                type="submit"
                :disabled="!passwordMatch || !form.newPassword || !form.confirmNewPassword"
                class="w-full gradient-bg text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 focus:ring-4 focus:ring-emerald-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                รีเซ็ตรหัสผ่าน
              </button>
            </form>
          </div>

          <!-- Step 4: Success -->
          <div v-if="currentStep === 4" class="slide-transition text-center">
            <div class="success-animation mb-6">
              <div class="circle mx-auto mb-4">
                <div class="checkmark"></div>
              </div>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">เรียบร้อยแล้ว!</h2>
            <p class="text-gray-600 mb-6">รหัสผ่านของคุณได้ถูกรีเซ็ตเรียบร้อยแล้ว</p>
            
            <button
              @click="goToLogin"
              class="w-full gradient-bg text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 focus:ring-4 focus:ring-emerald-200 transition-all"
            >
              เข้าสู่ระบบด้วยรหัสผ่านใหม่
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ResetPassword',
  setup() {
    const router = useRouter()
    const currentStep = ref(1)
    const resendTimer = ref(0)
    const timerInterval = ref(null)
    
    const form = ref({
      email: '',
      newPassword: '',
      confirmNewPassword: ''
    })
    
    const verificationDigits = ref(['', '', '', '', '', ''])
    const showNewPassword = ref(false)
    const showConfirmPassword = ref(false)
    const passwordStrength = ref('')
    const passwordMatch = ref(false)
    const passwordMismatch = ref(false)
    
    const isCodeComplete = computed(() => {
      return verificationDigits.value.every(digit => digit !== '')
    })
    
    const sendResetEmail = () => {
      // Simulate API call
      console.log('Sending reset email to:', form.value.email)
      currentStep.value = 2
      startResendTimer()
    }
    
    const verifyCode = () => {
      const code = verificationDigits.value.join('')
      console.log('Verifying code:', code)
      currentStep.value = 3
    }
    
    const resetPassword = () => {
      if (passwordMatch.value) {
        console.log('Resetting password')
        currentStep.value = 4
      }
    }
    
    const goToLogin = () => {
      router.push('/login')
    }
    
    const moveToNext = (event, index) => {
      const value = event.target.value
      if (value && index < 5) {
        const nextInput = event.target.parentElement.children[index + 1]
        if (nextInput) {
          nextInput.focus()
        }
      }
    }
    
    const handleKeydown = (event, index) => {
      if (event.key === 'Backspace' && !verificationDigits.value[index] && index > 0) {
        const prevInput = event.target.parentElement.children[index - 1]
        if (prevInput) {
          prevInput.focus()
        }
      }
    }
    
    const startResendTimer = () => {
      resendTimer.value = 60
      timerInterval.value = setInterval(() => {
        resendTimer.value--
        if (resendTimer.value <= 0) {
          clearInterval(timerInterval.value)
        }
      }, 1000)
    }
    
    const resendCode = () => {
      console.log('Resending verification code')
      startResendTimer()
    }
    
    const toggleNewPassword = () => {
      showNewPassword.value = !showNewPassword.value
    }
    
    const toggleConfirmPassword = () => {
      showConfirmPassword.value = !showConfirmPassword.value
    }
    
    const checkPasswordStrength = () => {
      const password = form.value.newPassword
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
      if (form.value.confirmNewPassword) {
        passwordMatch.value = form.value.newPassword === form.value.confirmNewPassword
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
    
    onUnmounted(() => {
      if (timerInterval.value) {
        clearInterval(timerInterval.value)
      }
    })
    
    return {
      currentStep,
      form,
      verificationDigits,
      showNewPassword,
      showConfirmPassword,
      passwordStrength,
      passwordMatch,
      passwordMismatch,
      resendTimer,
      isCodeComplete,
      sendResetEmail,
      verifyCode,
      resetPassword,
      goToLogin,
      moveToNext,
      handleKeydown,
      resendCode,
      toggleNewPassword,
      toggleConfirmPassword,
      checkPasswordStrength,
      checkPasswordMatch,
      getStrengthText
    }
  }
}
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
}

.slide-transition {
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.input-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.success-animation .circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #22c55e;
  position: relative;
  animation: scaleIn 0.5s ease-in-out;
}

.success-animation .checkmark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 35px;
  border: 4px solid white;
  border-top: none;
  border-left: none;
  transform: translate(-50%, -60%) rotate(45deg);
  animation: checkmark 0.5s ease-in-out 0.3s both;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes checkmark {
  from {
    opacity: 0;
    transform: translate(-50%, -60%) rotate(45deg) scale(0);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -60%) rotate(45deg) scale(1);
  }
}

input:focus {
  outline: none;
}
</style>
