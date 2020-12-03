<template>
    <header class="HeaderBase" :class="{ 'is-scroll': state.scrolled >= 60, 'is-open': state.open }">
        <nuxt-link to="/">
            <icon-base class="HeaderBase_logo" name="logos/antiswipe" />
        </nuxt-link>

        <button-base class="HeaderBase_burger" :modifiers="['round', 's', 'secondary']" icon-before="bars" @click="state.open = true"/>

        <nav class="HeaderBase_nav">
            <button-base class="HeaderBase_close" :modifiers="['round', 's', 'secondary']" icon-before="times" @click="state.open = false"/>

            <link-base
                v-for="item in navigation"
                class="HeaderBase_link"
                tag="nuxt-link"
                :attrs="{ to: localePath(item.to) }"
                :key="item.id"
                @click="state.open = false"
            >
                {{ item.title }}
            </link-base>

            <button-base class="HeaderBase_cta" tag="a" link="https://www.meetup.com/fr-FR/antiswipe-lgbt" target="_blank" :modifiers="['s']" @click="state.open = false">
                Nous rejoindre
            </button-base>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'HeaderBase',
    data: () => ({
        state: {
            scrolled: 0,
            open: false
        },
        navigation: [
            { id: 0, title: `Nos événements`, to: { path: '/', hash: '#events' } },
            { id: 2, title: `À propos de nous`, to: { path: '/', hash: '#about' } }
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