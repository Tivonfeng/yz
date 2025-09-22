<template>
  <div class="page5 w-full h-full relative overflow-hidden flex flex-col items-center justify-center px-15 py-12">
    
    <!-- 上方logo区域 -->
    <div class="grid grid-cols-3 gap-1 mb-8 z-10 max-w-3xl w-full">
      <div class="flex items-center justify-center transition-all duration-300 hover:scale-105 hover:drop-shadow-xl cursor-pointer">
        <img src="@/assets/yz/05/仪征.png" alt="仪征市" class="h-12 w-auto object-contain drop-shadow-lg" />
      </div>
      <div class="flex items-center justify-center transition-all duration-300 hover:scale-105 hover:drop-shadow-xl cursor-pointer">
        <img src="@/assets/yz/05/金湖.png" alt="金湖县" class="h-12 w-auto object-contain drop-shadow-lg" />
      </div>
      <div class="flex items-center justify-center transition-all duration-300 hover:scale-105 hover:drop-shadow-xl cursor-pointer">
        <img src="@/assets/yz/05/来安.png" alt="来安县" class="h-12 w-auto object-contain drop-shadow-lg" />
      </div>
    </div>

    <!-- 下方logo区域 -->
    <div class="grid grid-cols-3 gap-1 z-10 max-w-3xl w-full">
      <div class="flex items-center justify-center transition-all duration-300 hover:scale-105 hover:drop-shadow-xl cursor-pointer">
        <img src="@/assets/yz/05/六合.png" alt="六合区" class="h-12 w-auto object-contain drop-shadow-lg" />
      </div>
      <div class="flex items-center justify-center transition-all duration-300 hover:scale-105 hover:drop-shadow-xl cursor-pointer">
        <img src="@/assets/yz/05/定远.png" alt="定远县" class="h-12 w-auto object-contain drop-shadow-lg" />
      </div>
      <div class="flex items-center justify-center transition-all duration-300 hover:scale-105 hover:drop-shadow-xl cursor-pointer">
        <img src="@/assets/yz/05/盱眙.png" alt="盱眙县" class="h-12 w-auto object-contain drop-shadow-lg" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.page5 {
  background-image: url('@/assets/yz/05/bg.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>