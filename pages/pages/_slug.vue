<template>
    <div class="Page" v-if="page">
        <div class="LayoutDefault_banner">
            <div class="Wrapper Wrapper--xs">
                <h1 class="ft-title-3xl-bold color-cherry">{{ page.title }}</h1>
                <p class="ft-l-medium mt-20 max-width-m" v-if="page.excerpt">{{ page.excerpt }}</p>
            </div>
        </div>

        <div class="Wrapper Wrapper--xs mt-60 mb-150">
            <div v-if="page.cover">
                <img class="width-100 n-mt-100 mb-40 br-12" :src="page.cover" />
            </div>

            <text-body class="TextBody" :value="page.content"></text-body>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GenericPage',
    async fetch () {
        await this.$store.dispatch('pages/get', { query: { slug: this.$route.params.slug }})
    },
    computed: {
        page () {
            return this.$store.getters['pages/findOne']({
                slug: this.$route.params.slug
            })
        }
    }
}
</script>