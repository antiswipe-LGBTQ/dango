<template>
    <div v-if="page">
        <div class="Wrapper mt-100">
            {{ page.title }}
        </div>

        <div class="Wrapper Wrapper--s">
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