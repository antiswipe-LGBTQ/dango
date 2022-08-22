<template>
    <header class="HeaderBase" :class="{ 'is-scroll': state.scrolled >= 60, 'is-open': state.open }">
        <nuxt-link to="/">
            <img class="HeaderBase_logo" :src="assets.logo" />
        </nuxt-link>

        <button-base class="HeaderBase_burger" :modifiers="['round', 's', 'secondary']" icon-before="bars" @click="state.open = true"/>

        <nav class="HeaderBase_nav">
            <button-base class="HeaderBase_close" :modifiers="['round', 's', 'secondary']" icon-before="times" @click="state.open = false"/>

            <link-base
                v-for="item in navigation"
                class="HeaderBase_link"
                :tag="item.to ? 'nuxt-link' : 'a'"
                :attrs="item.to ? { to: localePath(item.to) } : {}"
                :href="item.href ? item.href : ''"
                :target="item.href ? '_blank' : '_self'"
                :key="item.id"
                @click="state.open = false"
            >
                {{ item.title }}
            </link-base>

            <button-base class="HeaderBase_cta" tag="nuxt-link" :attrs="{ to: localePath({ name: 'asso-join' }) }" :modifiers="['s']" @click="state.open = false">
                Adhérer à l'asso
            </button-base>
        </nav>
    </header>
</template>

<script>
import logo from '@/assets/img/logo/logo-lgbt.png'

export default {
    name: 'HeaderBase',
    data: () => ({
        assets: { logo },
        state: {
            scrolled: 0,
            open: false
        },
        navigation: []
    }),
    mounted () {
        this.$data.navigation = [
            { id: 0, title: `Nos événements`, to: { path: '/', hash: '#events' } },
            { id: 1, title: `La communauté`, href: 'https://discord.gg/ckdjYscrwQ' }
        ]

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