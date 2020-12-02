<template>
    <div class="Page" v-if="page">
        <div class="LayoutDefault_banner">
            <div class="Wrapper Wrapper--s">
                <h1 class="ft-title-2xl-bold color-cherry">{{ page.title }}</h1>
            </div>
        </div>

        <div class="Wrapper Wrapper--xs TextBody mv-60">
            <div v-html="page.content"></div>
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