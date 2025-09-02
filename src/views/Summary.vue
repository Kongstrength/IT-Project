<template>
  <div class="min-h-screen">
    <Navbar />
    
    <!-- Main Content -->
    <div class="pt-20 pb-12">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">วางแผนมื้ออาหาร</h1>
          <p class="text-gray-600">จัดการและวางแผนมื้ออาหารประจำสัปดาห์ของคุณ</p>
        </div>
        
        <!-- Quick Actions -->
        <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div class="flex flex-col sm:flex-row gap-4">
            <button @click="openAddMealModal" class="gradient-bg text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              เพิ่มเมนูอาหาร
            </button>
            
            <button @click="generatePlan" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              สร้างแผนอัตโนมัติ
            </button>
            
            <button @click="openShoppingList" class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              รายการซื้อของ
            </button>
          </div>
        </div>
        
        <!-- Calendar Week View -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-800">แผนอาหารสัปดาห์นี้</h2>
            <div class="flex items-center space-x-4">
              <button @click="previousWeek" class="p-2 text-gray-600 hover:text-emerald-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <span class="font-medium text-gray-800">{{ currentWeekText }}</span>
              <button @click="nextWeek" class="p-2 text-gray-600 hover:text-emerald-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Calendar Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-7 gap-4">
            <div 
              v-for="(day, index) in weekDays" 
              :key="index"
              class="border rounded-lg p-4 min-h-80"
              :class="{ 'bg-emerald-50 border-emerald-200': day.isToday, 'bg-gray-50': !day.isToday }"
            >
              <div class="text-center mb-4">
                <p class="font-medium text-gray-800">{{ day.dayName }}</p>
                <p class="text-sm text-gray-600">{{ day.date }}</p>
              </div>
              
              <!-- Meals for the day -->
              <div class="space-y-3">
                <!-- Breakfast -->
                <div class="meal-slot" data-meal-type="breakfast">
                  <div v-if="day.meals.breakfast" class="bg-white rounded-lg p-3 shadow-sm border-l-4 border-yellow-400 hover:shadow-md transition-shadow cursor-pointer">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-medium text-sm text-gray-800">{{ day.meals.breakfast.name }}</p>
                        <p class="text-xs text-gray-600">{{ day.meals.breakfast.calories }} แคล • ฿{{ day.meals.breakfast.cost }}</p>
                      </div>
                      <span class="breakfast meal-type">เช้า</span>
                    </div>
                  </div>
                  <div v-else class="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center text-gray-400 hover:border-emerald-400 hover:text-emerald-600 cursor-pointer transition-colors" @click="addMeal(day.date, 'breakfast')">
                    <p class="text-sm">+ เพิ่มอาหารเช้า</p>
                  </div>
                </div>
                
                <!-- Lunch -->
                <div class="meal-slot" data-meal-type="lunch">
                  <div v-if="day.meals.lunch" class="bg-white rounded-lg p-3 shadow-sm border-l-4 border-blue-400 hover:shadow-md transition-shadow cursor-pointer">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-medium text-sm text-gray-800">{{ day.meals.lunch.name }}</p>
                        <p class="text-xs text-gray-600">{{ day.meals.lunch.calories }} แคล • ฿{{ day.meals.lunch.cost }}</p>
                      </div>
                      <span class="lunch meal-type">กลางวัน</span>
                    </div>
                  </div>
                  <div v-else class="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center text-gray-400 hover:border-emerald-400 hover:text-emerald-600 cursor-pointer transition-colors" @click="addMeal(day.date, 'lunch')">
                    <p class="text-sm">+ เพิ่มอาหารกลางวัน</p>
                  </div>
                </div>
                
                <!-- Dinner -->
                <div class="meal-slot" data-meal-type="dinner">
                  <div v-if="day.meals.dinner" class="bg-white rounded-lg p-3 shadow-sm border-l-4 border-purple-400 hover:shadow-md transition-shadow cursor-pointer">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-medium text-sm text-gray-800">{{ day.meals.dinner.name }}</p>
                        <p class="text-xs text-gray-600">{{ day.meals.dinner.calories }} แคล • ฿{{ day.meals.dinner.cost }}</p>
                      </div>
                      <span class="dinner meal-type">เย็น</span>
                    </div>
                  </div>
                  <div v-else class="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center text-gray-400 hover:border-emerald-400 hover:text-emerald-600 cursor-pointer transition-colors" @click="addMeal(day.date, 'dinner')">
                    <p class="text-sm">+ เพิ่มอาหารเย็น</p>
                  </div>
                </div>
                
                <!-- Daily Summary -->
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <div class="text-xs text-gray-600 space-y-1">
                    <div class="flex justify-between">
                      <span>รวมแคลอรี่:</span>
                      <span class="font-medium">{{ getTotalCalories(day) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>รวมค่าใช้จ่าย:</span>
                      <span class="font-medium">฿{{ getTotalCost(day) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Add Meal Modal -->
    <div v-if="showAddMealModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div class="p-6 border-b">
          <h3 class="text-lg font-bold text-gray-800">เพิ่มเมนูอาหาร</h3>
        </div>
        
        <div class="p-6">
          <form @submit.prevent="addNewMeal" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อเมนู</label>
              <input 
                v-model="newMeal.name"
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="เช่น ข้าวผัดกุ้ง"
              >
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">แคลอรี่</label>
                <input 
                  v-model="newMeal.calories"
                  type="number" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="350"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">ราคา (บาท)</label>
                <input 
                  v-model="newMeal.cost"
                  type="number" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="50"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">ประเภทมื้อ</label>
              <select 
                v-model="newMeal.type"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="breakfast">อาหารเช้า</option>
                <option value="lunch">อาหารกลางวัน</option>
                <option value="dinner">อาหารเย็น</option>
                <option value="snack">ของว่าง</option>
              </select>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4">
              <button 
                type="button" 
                @click="closeAddMealModal"
                class="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                ยกเลิก
              </button>
              <button 
                type="submit"
                class="gradient-bg text-white px-6 py-2 rounded-lg hover:opacity-90"
              >
                เพิ่มเมนู
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Summary',
  components: {
    Navbar,
    Footer
  },
  setup() {
    const currentWeek = ref(new Date())
    const showAddMealModal = ref(false)
    const selectedDate = ref('')
    const selectedMealType = ref('')
    
    const newMeal = ref({
      name: '',
      calories: '',
      cost: '',
      type: 'breakfast'
    })
    
    // Sample data
    const mealData = ref({
      '2025-08-05': {
        breakfast: { name: 'ข้าวต้มไข่', calories: 280, cost: 45 },
        lunch: { name: 'ข้าวผัดกุ้ง', calories: 520, cost: 75 },
        dinner: null
      },
      '2025-08-06': {
        breakfast: null,
        lunch: null,
        dinner: null
      }
    })
    
    const weekDays = computed(() => {
      const days = []
      const startOfWeek = new Date(currentWeek.value)
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
      
      const dayNames = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek)
        date.setDate(startOfWeek.getDate() + i)
        
        const dateStr = date.toISOString().split('T')[0]
        const isToday = dateStr === new Date().toISOString().split('T')[0]
        
        days.push({
          date: dateStr,
          dayName: dayNames[date.getDay()],
          isToday,
          meals: mealData.value[dateStr] || { breakfast: null, lunch: null, dinner: null }
        })
      }
      
      return days
    })
    
    const currentWeekText = computed(() => {
      const startOfWeek = new Date(currentWeek.value)
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
      
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      
      const startMonth = startOfWeek.getMonth() + 1
      const endMonth = endOfWeek.getMonth() + 1
      
      return `${startOfWeek.getDate()}/${startMonth} - ${endOfWeek.getDate()}/${endMonth}`
    })
    
    const previousWeek = () => {
      const prev = new Date(currentWeek.value)
      prev.setDate(prev.getDate() - 7)
      currentWeek.value = prev
    }
    
    const nextWeek = () => {
      const next = new Date(currentWeek.value)
      next.setDate(next.getDate() + 7)
      currentWeek.value = next
    }
    
    const openAddMealModal = () => {
      showAddMealModal.value = true
    }
    
    const closeAddMealModal = () => {
      showAddMealModal.value = false
      newMeal.value = {
        name: '',
        calories: '',
        cost: '',
        type: 'breakfast'
      }
    }
    
    const addMeal = (date, mealType) => {
      selectedDate.value = date
      selectedMealType.value = mealType
      newMeal.value.type = mealType
      openAddMealModal()
    }
    
    const addNewMeal = () => {
      const dateKey = selectedDate.value || new Date().toISOString().split('T')[0]
      
      if (!mealData.value[dateKey]) {
        mealData.value[dateKey] = { breakfast: null, lunch: null, dinner: null }
      }
      
      mealData.value[dateKey][newMeal.value.type] = {
        name: newMeal.value.name,
        calories: parseInt(newMeal.value.calories),
        cost: parseInt(newMeal.value.cost)
      }
      
      closeAddMealModal()
    }
    
    const getTotalCalories = (day) => {
      let total = 0
      if (day.meals.breakfast) total += day.meals.breakfast.calories
      if (day.meals.lunch) total += day.meals.lunch.calories
      if (day.meals.dinner) total += day.meals.dinner.calories
      return total
    }
    
    const getTotalCost = (day) => {
      let total = 0
      if (day.meals.breakfast) total += day.meals.breakfast.cost
      if (day.meals.lunch) total += day.meals.lunch.cost
      if (day.meals.dinner) total += day.meals.dinner.cost
      return total
    }
    
    const generatePlan = () => {
      // Auto-generate meal plan logic
      alert('สร้างแผนอาหารอัตโนมัติ (ฟีเจอร์นี้จะพัฒนาต่อไป)')
    }
    
    const openShoppingList = () => {
      // Open shopping list modal
      alert('รายการซื้อของ (ฟีเจอร์นี้จะพัฒนาต่อไป)')
    }
    
    return {
      weekDays,
      currentWeekText,
      showAddMealModal,
      newMeal,
      previousWeek,
      nextWeek,
      openAddMealModal,
      closeAddMealModal,
      addMeal,
      addNewMeal,
      getTotalCalories,
      getTotalCost,
      generatePlan,
      openShoppingList
    }
  }
}
</script>
