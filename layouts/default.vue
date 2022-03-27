<template>
  <div class="LayoutDefault" :class="[ ...pageClasses ]">
    <header-base />

    <Nuxt />

    <footer-base />
  </div>
</template>

<script>


export default {
    name: 'LayoutDefault',
    computed: {
        pageClasses () { return this.$store.state.page.body.classes }
    },
    async mounted () {
      try {
          await this.$recaptcha.init()
      } catch (e) {
          console.error(e)
      }
    },
    
    beforeDestroy() {
       this.$recaptcha.destroy()
    }
}
</script>