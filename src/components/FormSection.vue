<template>
  <div class="form-section">
    <h3 class="form-section__title">{{ title }}</h3>
    <div class="form-section__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script> 