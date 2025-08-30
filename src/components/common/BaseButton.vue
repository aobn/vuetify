<template>
  <v-btn
    :variant="variant"
    :color="color"
    :disabled="disabled"
    :loading="loading"
    @click="handleClick"
  >
    {{ text }}
  </v-btn>
</template>

<script setup lang="ts">
interface Props {
  text: string
  variant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
  color?: string
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'elevated',
  color: 'primary',
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>