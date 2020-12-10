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
    mounted () {
        this.$store.commit('user/setIdentity')
    }
}
</script>