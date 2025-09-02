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
            <router-link to="/search" class="text-emerald-200 border-b-2 border-emerald-200 pb-1">ค้นหาเมนู</router-link>
            <router-link to="/talad-nearby" class="hover:text-emerald-200">ตลาดใกล้เคียง</router-link>
            <router-link to="/summary" class="hover:text-emerald-200">สรุปแผน</router-link>
            <router-link to="/profile" class="hover:text-emerald-200">โปรไฟล์</router-link>
            <button @click="logout" class="hover:text-emerald-200">ออกจากระบบ</button>
          </div>
          
          <div class="md:hidden">
            <button @click="toggleMobileMenu" class="text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile Menu -->
        <div v-if="showMobileMenu" class="md:hidden pb-4 slide-down">
          <router-link to="/search" class="block py-2 text-emerald-200">ค้นหาเมนู</router-link>
          <router-link to="/talad-nearby" class="block py-2 hover:text-emerald-200">ตลาดใกล้เคียง</router-link>
          <router-link to="/summary" class="block py-2 hover:text-emerald-200">สรุปแผน</router-link>
          <router-link to="/profile" class="block py-2 hover:text-emerald-200">โปรไฟล์</router-link>
          <button @click="logout" class="block py-2 hover:text-emerald-200 text-left">ออกจากระบบ</button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="pt-20 pb-12">
      <div class="container mx-auto px-4">
        <!-- Search Header -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">ค้นหาเมนูอาหาร</h1>
          
          <!-- Search Bar -->
          <div class="relative mb-6">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="ค้นหาเมนู เช่น ข้าวผัด, ส้มตำ, ต้มยำ..."
                  class="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                  @keyup.enter="searchRecipes"
                >
              </div>
              
              <button 
                @click="searchRecipes"
                class="gradient-bg text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all flex items-center justify-center font-medium"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                ค้นหา
              </button>
            </div>
          </div>
          
          <!-- Filter Tabs -->
          <div class="flex flex-wrap gap-2 mb-6">
            <button 
              v-for="category in categories" 
              :key="category.id"
              @click="selectCategory(category.id)"
              :class="['px-4 py-2 rounded-full text-sm font-medium transition-all', 
                       selectedCategory === category.id 
                       ? 'bg-emerald-600 text-white' 
                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
            >
              {{ category.name }}
            </button>
          </div>
          
          <!-- Popular Tags -->
          <div class="border-t pt-4">
            <h3 class="text-sm font-medium text-gray-700 mb-3">แท็กยอดนิยม:</h3>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="tag in popularTags" 
                :key="tag"
                @click="searchByTag(tag)"
                class="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-full hover:bg-emerald-50 hover:text-emerald-700 transition-all"
              >
                {{ tag }}
              </button>
            </div>
          </div>
        </div>

        <!-- Results or Loading -->
        <div v-if="isLoading" class="text-center py-12">
          <div class="spinner mx-auto mb-4"></div>
          <p class="text-gray-600">กำลังค้นหาเมนูอาหาร...</p>
        </div>

        <div v-else-if="hasSearched">
          <!-- Search Results -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div v-for="recipe in searchResults" :key="recipe.id" class="bg-white rounded-xl shadow-lg overflow-hidden">
              <div class="relative">
                <img :src="recipe.image" :alt="recipe.name" class="w-full h-48 object-cover">
                <button 
                  @click="toggleFavorite(recipe.id)"
                  class="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-all"
                >
                  <svg 
                    :class="['w-5 h-5', recipe.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400']" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
                <div class="absolute bottom-3 left-3">
                  <span class="px-2 py-1 bg-emerald-600 text-white text-xs rounded-full">
                    {{ recipe.category }}
                  </span>
                </div>
              </div>
              
              <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ recipe.name }}</h3>
                <p class="text-gray-600 text-sm mb-4">{{ recipe.description }}</p>
                
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center text-sm text-gray-500">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {{ recipe.cookTime }} นาที
                    </div>
                    <div class="flex items-center text-sm text-gray-500">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      {{ recipe.servings }} ที่
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="flex text-yellow-400">
                      <svg v-for="star in 5" :key="star" :class="['w-4 h-4', star <= recipe.rating ? 'fill-current' : 'fill-gray-300']" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span class="text-sm text-gray-600 ml-1">({{ recipe.rating }})</span>
                  </div>
                </div>
                
                <div class="flex space-x-2">
                  <button 
                    @click="viewRecipe(recipe.id)"
                    class="flex-1 gradient-bg text-white py-2 px-4 rounded-lg hover:opacity-90 transition-all text-sm font-medium"
                  >
                    ดูสูตร
                  </button>
                  <button 
                    @click="addToMealPlan(recipe.id)"
                    class="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-all text-sm font-medium"
                  >
                    เพิ่มลงแผน
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- No Results -->
          <div v-if="searchResults.length === 0" class="text-center py-12">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">ไม่พบเมนูที่ค้นหา</h3>
            <p class="text-gray-600 mb-4">ลองเปลี่ยนคำค้นหาหรือใช้ตัวกรองอื่น</p>
            <button 
              @click="clearSearch"
              class="gradient-bg text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all"
            >
              ลบคำค้นหา
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Search',
  setup() {
    const router = useRouter()
    const showMobileMenu = ref(false)
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const isLoading = ref(false)
    const hasSearched = ref(false)
    
    const filters = reactive({
      cookTime: '',
      difficulty: '',
      servings: ''
    })
    
    const categories = ref([
      { id: '', name: 'ทั้งหมด' },
      { id: 'thai', name: 'อาหารไทย' },
      { id: 'chinese', name: 'อาหารจีน' },
      { id: 'japanese', name: 'อาหารญี่ปุ่น' },
      { id: 'western', name: 'อาหารฝรั่ง' },
      { id: 'dessert', name: 'ของหวาน' },
      { id: 'vegetarian', name: 'อาหารเจ' }
    ])
    
    const popularTags = ref([
      'ทำง่าย', 'อร่อย', 'สุขภาพดี', 'ไม่แพง', 'เผ็ด', 'หวาน', 'เปรียว', 'ครบ 5 หมู่'
    ])
    
    const searchResults = ref([
      {
        id: 1,
        name: 'ผัดกะเพราหมูสับ',
        description: 'เมนูผัดกะเพราหมูสับ รสชาติจัดจ้าน เผ็ดร้อน หอมกะเพรา เสิร์ฟพร้อมข้าวสวยร้อน ๆ และไข่ดาว',
        image: 'https://via.placeholder.com/400x300/22c55e/ffffff?text=ผัดกะเพรา',
        category: 'อาหารไทย',
        cookTime: 15,
        servings: 2,
        rating: 4.5,
        isFavorite: false
      },
      {
        id: 2,
        name: 'ส้มตำไทย',
        description: 'ส้มตำรสชาติดั้งเดิม เปรียว หวาน เผ็ด เค็ม ครบรส เสิร์ฟพร้อมผักสด',
        image: 'https://via.placeholder.com/400x300/22c55e/ffffff?text=ส้มตำ',
        category: 'อาหารไทย',
        cookTime: 10,
        servings: 1,
        rating: 4.8,
        isFavorite: true
      },
      {
        id: 3,
        name: 'ต้มยำกุ้ง',
        description: 'ต้มยำกุ้งน้ำข้น รสเปรียว เผ็ด หอมสมุนไพร กุ้งสด เห็ด มะเขือเทศ',
        image: 'https://via.placeholder.com/400x300/22c55e/ffffff?text=ต้มยำกุ้ง',
        category: 'อาหารไทย',
        cookTime: 25,
        servings: 3,
        rating: 4.7,
        isFavorite: false
      }
    ])
    
    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }
    
    const searchRecipes = () => {
      isLoading.value = true
      hasSearched.value = true
      
      // Simulate API call
      setTimeout(() => {
        isLoading.value = false
        console.log('Searching for:', searchQuery.value)
      }, 1000)
    }
    
    const searchByTag = (tag) => {
      searchQuery.value = tag
      searchRecipes()
    }
    
    const selectCategory = (categoryId) => {
      selectedCategory.value = categoryId
      searchRecipes()
    }
    
    const toggleFavorite = (recipeId) => {
      const recipe = searchResults.value.find(r => r.id === recipeId)
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite
      }
    }
    
    const viewRecipe = (recipeId) => {
      console.log('Viewing recipe:', recipeId)
      // Navigate to recipe detail page
    }
    
    const addToMealPlan = (recipeId) => {
      console.log('Adding to meal plan:', recipeId)
      // Add to meal plan logic
    }
    
    const clearSearch = () => {
      searchQuery.value = ''
      selectedCategory.value = ''
      filters.cookTime = ''
      filters.difficulty = ''
      filters.servings = ''
      searchResults.value = []
      hasSearched.value = false
    }
    
    const logout = () => {
      console.log('Logging out...')
      router.push('/login')
    }
    
    return {
      showMobileMenu,
      searchQuery,
      selectedCategory,
      isLoading,
      hasSearched,
      filters,
      categories,
      popularTags,
      searchResults,
      toggleMobileMenu,
      searchRecipes,
      searchByTag,
      selectCategory,
      toggleFavorite,
      viewRecipe,
      addToMealPlan,
      clearSearch,
      logout
    }
  }
}
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
}

.slide-down {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.spinner {
  border: 4px solid #f3f4f6;
  border-top: 4px solid #22c55e;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
