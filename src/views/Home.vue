<template>
  <div class="min-h-screen">
    <Navbar />
    
    <!-- Main Content -->
    <div class="pt-20 pb-12">
      <!-- Dashboard Overview -->
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-6">
          <!-- Left Side - Dashboard Stats -->
          <div class="w-full lg:w-2/3 space-y-6">
            <!-- Welcome Section -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <div class="flex flex-col md:flex-row items-center justify-between">
                <div class="mb-4 md:mb-0">
                  <h1 class="text-2xl font-bold text-gray-800 mb-2">สวัสดี สมชาย! 👋</h1>
                  <p class="text-gray-600">วันนี้คุณมีแผนอาหารอะไรบ้าง?</p>
                </div>
                <button class="gradient-bg text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
                  เริ่มวางแผนมื้ออาหาร
                </button>
              </div>
            </div>
            
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div class="flex items-center">
                  <div class="p-3 bg-blue-100 rounded-lg">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm text-gray-600">งบประมาณวันนี้</p>
                    <p class="text-2xl font-bold text-gray-800">฿185</p>
                    <p class="text-xs text-green-600">เหลือ ฿65</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div class="flex items-center">
                  <div class="p-3 bg-green-100 rounded-lg">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm text-gray-600">แคลอรี่วันนี้</p>
                    <p class="text-2xl font-bold text-gray-800">1,420</p>
                    <p class="text-xs text-blue-600">เป้าหมาย 1,800</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div class="flex items-center">
                  <div class="p-3 bg-purple-100 rounded-lg">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm text-gray-600">มื้อถัดไป</p>
                    <p class="text-2xl font-bold text-gray-800">12:00</p>
                    <p class="text-xs text-gray-600">ข้าวผัดกุ้ง</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Today's Meals -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-800">มื้ออาหารวันนี้</h2>
                <button class="text-emerald-600 hover:text-emerald-700 font-medium">
                  ดูทั้งหมด
                </button>
              </div>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                      <span class="text-2xl">🍳</span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-800">อาหารเช้า</p>
                      <p class="text-sm text-gray-600">ข้าวต้มไข่ + นมถั่วเหลือง</p>
                      <p class="text-xs text-gray-500">280 แคล • ฿45</p>
                    </div>
                  </div>
                  <span class="breakfast meal-type">เช้า</span>
                </div>
                
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span class="text-2xl">🍛</span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-800">อาหารกลางวัน</p>
                      <p class="text-sm text-gray-600">ข้าวผัดกุ้ง + ต้มยำกุ้ง</p>
                      <p class="text-xs text-gray-500">520 แคล • ฿75</p>
                    </div>
                  </div>
                  <span class="lunch meal-type">กลางวัน</span>
                </div>
                
                <div class="flex items-center justify-between p-4 border-2 border-dashed border-gray-300 rounded-lg">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <span class="text-2xl text-gray-400">🍽️</span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-400">อาหารเย็น</p>
                      <p class="text-sm text-gray-400">ยังไม่ได้วางแผน</p>
                    </div>
                  </div>
                  <button class="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    + เพิ่มเมนู
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right Side - Charts and Quick Actions -->
          <div class="w-full lg:w-1/3 space-y-6">
            <!-- Budget Chart -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4">งบประมาณสัปดาห์นี้</h3>
              <div class="relative h-48 flex items-center justify-center">
                <canvas ref="budgetChart" width="200" height="200"></canvas>
              </div>
              <div class="mt-4 space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">ใช้ไปแล้ว</span>
                  <span class="font-medium">฿750</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">เหลือ</span>
                  <span class="font-medium text-emerald-600">฿250</span>
                </div>
              </div>
            </div>
            
            <!-- Nutrition Chart -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4">โภชนาการวันนี้</h3>
              <div class="h-48">
                <canvas ref="nutritionChart"></canvas>
              </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4">การดำเนินการด่วน</h3>
              <div class="space-y-3">
                <button class="w-full text-left p-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                  <div class="flex items-center">
                    <span class="text-emerald-600 mr-3">📝</span>
                    <span class="text-emerald-700 font-medium">สร้างแผนอาหารใหม่</span>
                  </div>
                </button>
                
                <button class="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div class="flex items-center">
                    <span class="text-blue-600 mr-3">🛒</span>
                    <span class="text-blue-700 font-medium">รายการซื้อของ</span>
                  </div>
                </button>
                
                <button class="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div class="flex items-center">
                    <span class="text-purple-600 mr-3">📊</span>
                    <span class="text-purple-700 font-medium">รายงานโภชนาการ</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Footer
  },
  setup() {
    const budgetChart = ref(null)
    const nutritionChart = ref(null)
    
    onMounted(() => {
      // Initialize charts when component is mounted
      if (typeof window !== 'undefined' && window.Chart) {
        initBudgetChart()
        initNutritionChart()
      }
    })
    
    const initBudgetChart = () => {
      if (!budgetChart.value) return
      
      const ctx = budgetChart.value.getContext('2d')
      new window.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['ใช้แล้ว', 'เหลือ'],
          datasets: [{
            data: [750, 250],
            backgroundColor: ['#ef4444', '#22c55e'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      })
    }
    
    const initNutritionChart = () => {
      if (!nutritionChart.value) return
      
      const ctx = nutritionChart.value.getContext('2d')
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['โปรตีน', 'คาร์บ', 'ไขมัน', 'ไฟเบอร์'],
          datasets: [{
            data: [85, 65, 45, 70],
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      })
    }
    
    return {
      budgetChart,
      nutritionChart
    }
  }
}
</script>
