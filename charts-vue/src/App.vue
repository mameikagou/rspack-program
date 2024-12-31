<script setup lang="ts">
    import BaseChart from "@/components/BaseChart.vue";
</script>

<template>
  <div class="container">
    <BaseChart 
      chartId="line1" 
      chartType="line" 
      height="800px"
      width="50%"
    />
    <BaseChart 
      chartId="pie1" 
      chartType="pie" 
      height="800px"
      width="50%"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
  width: 100%;
  padding: 20px;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
</style>
