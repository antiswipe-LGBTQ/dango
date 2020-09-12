<template>
    <header class="HeaderBase" :class="{ 'is-scroll': state.scrolled >= 60 }">
        <div>
            antiswipe
        </div>
        <div class="d-flex fx-align-center">
            <link-base
                v-for="item in navigation"
                class="HeaderBase_link mr-30"
                :href="item.link"
                :key="item.id"
            >
                {{ item.title }}
            </link-base>

            <button-base>
                Nous rejoindre
            </button-base>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderBase',
    data: () => ({
        state: {
            scrolled: 0
        },
        navigation: [
            { id: 0, title: `L'association`, link: '#' },
            { id: 1, title: 'Questions fréquentes', link: '#' }
        ]
    }),
    mounted () {
        this.onScroll()
        window.addEventListener('scroll', this.onScroll, { passive: true })
    },
    methods: {
        onScroll (e) {
            this.$data.state.scrolled = window.scrollY
        }
    }
}
</script>