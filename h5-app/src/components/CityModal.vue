<template>
  <div v-if="visible" class="city-modal-overlay" @click="handleOverlayClick">
    <div class="city-modal-content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])

const handleOverlayClick = () => {
  if (props.closeOnOverlayClick) {
    emit('close')
  }
}
</script>

<style scoped>
.city-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

.city-modal-content {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 20px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: scale(0.9) translateY(20px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
</style>