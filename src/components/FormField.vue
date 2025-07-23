<template>
  <div class="form-field">
    <label v-if="label" class="form-field__label">{{ label }}</label>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string
}

defineProps<Props>()
</script> 