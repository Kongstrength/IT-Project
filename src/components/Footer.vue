<template>
  <footer class="bg-white border-t">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center mb-4 md:mb-0">
          <div class="w-6 h-6 gradient-bg rounded flex items-center justify-center mr-2">
            <span class="text-white font-bold text-sm">🍽️</span>
          </div>
          <span class="text-gray-700 font-medium">FoodPlan</span>
        </div>
        
        <div class="flex space-x-6 text-sm text-gray-600">
          <a href="#" class="hover:text-emerald-600">เกี่ยวกับเรา</a>
          <a href="#" class="hover:text-emerald-600">ติดต่อ</a>
          <a href="#" class="hover:text-emerald-600">นโยบายความเป็นส่วนตัว</a>
        </div>
      </div>
      
      <div class="border-t mt-6 pt-6 text-center text-gray-500 text-sm">
        <p>&copy; 2025 FoodPlan. สงวนลิขสิทธิ์.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
