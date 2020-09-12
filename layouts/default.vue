<template>
  <div class="LayoutDefault">
    <header-base />
    <Nuxt />
  </div>
</template>

<script>
import HeaderBase from '@/components/layout/HeaderBase'

export default {
  name: 'LayoutDefault',
  components: { HeaderBase }
}
</script>