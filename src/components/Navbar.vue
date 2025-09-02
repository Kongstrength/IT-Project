<template>
  <nav class="bg-white shadow-md fixed w-full z-10">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">🍽️</span>
            </div>
            <span class="text-xl font-bold text-gray-800">FoodPlan</span>
          </router-link>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-8">
          <router-link to="/" class="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
            หน้าหลัก
          </router-link>
          <router-link to="/summary" class="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
            วางแผนมื้ออาหาร
          </router-link>
          <router-link to="/search" class="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
            ค้นหาเมนู
          </router-link>
          <router-link to="/talad-nearby" class="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
            ตลาดใกล้บ้าน
          </router-link>
        </div>
        
        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <div class="relative">
            <button @click="toggleNotifications" class="p-2 text-gray-600 hover:text-emerald-600 relative">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
            
            <!-- Notification Dropdown -->
            <div v-show="showNotifications" class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border py-2 z-20">
              <div class="px-4 py-2 border-b">
                <h3 class="font-medium text-gray-800">การแจ้งเตือน</h3>
              </div>
              <div class="max-h-64 overflow-y-auto">
                <div class="px-4 py-3 hover:bg-gray-50 border-b">
                  <p class="text-sm text-gray-800">เตือนวางแผนมื้อเที่ยงวันนี้</p>
                  <p class="text-xs text-gray-500 mt-1">10 นาทีที่แล้ว</p>
                </div>
                <div class="px-4 py-3 hover:bg-gray-50 border-b">
                  <p class="text-sm text-gray-800">งบประมาณสัปดาห์นี้เหลือ 250 บาท</p>
                  <p class="text-xs text-gray-500 mt-1">1 ชั่วโมงที่แล้ว</p>
                </div>
                <div class="px-4 py-3 hover:bg-gray-50">
                  <p class="text-sm text-gray-800">อย่าลืมซื้อผักตามรายการ</p>
                  <p class="text-xs text-gray-500 mt-1">3 ชั่วโมงที่แล้ว</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Profile Menu -->
          <div class="relative">
            <button @click="toggleProfile" class="flex items-center space-x-2">
              <img class="w-8 h-8 rounded-full" src="https://via.placeholder.com/32" alt="Profile">
              <span class="hidden md:block text-gray-700 font-medium">สมชาย ใจดี</span>
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <!-- Profile Dropdown -->
            <div v-show="showProfile" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-20">
              <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">แก้ไขโปรไฟล์</router-link>
              <router-link to="/security" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">ความปลอดภัย</router-link>
              <div class="border-t my-2"></div>
              <button @click="logout" class="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">ออกจากระบบ</button>
            </div>
          </div>
          
          <!-- Mobile Menu Button -->
          <button @click="toggleMobileMenu" class="md:hidden p-2 text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Navigation -->
      <div v-show="showMobileMenu" class="md:hidden border-t py-4">
        <div class="space-y-2">
          <router-link to="/" class="block py-2 text-gray-600 hover:text-emerald-600">หน้าหลัก</router-link>
          <router-link to="/summary" class="block py-2 text-gray-600 hover:text-emerald-600">วางแผนมื้ออาหาร</router-link>
          <router-link to="/search" class="block py-2 text-gray-600 hover:text-emerald-600">ค้นหาเมนู</router-link>
          <router-link to="/talad-nearby" class="block py-2 text-gray-600 hover:text-emerald-600">ตลาดใกล้บ้าน</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter()
    const showProfile = ref(false)
    const showNotifications = ref(false)
    const showMobileMenu = ref(false)
    
    const toggleProfile = () => {
      showProfile.value = !showProfile.value
      showNotifications.value = false
    }
    
    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value
      showProfile.value = false
    }
    
    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }
    
    const logout = () => {
      // Handle logout logic here
      router.push('/login')
    }
    
    return {
      showProfile,
      showNotifications,
      showMobileMenu,
      toggleProfile,
      toggleNotifications,
      toggleMobileMenu,
      logout
    }
  }
}
</script>
