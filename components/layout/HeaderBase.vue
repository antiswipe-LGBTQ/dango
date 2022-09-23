<template>
    <header class="HeaderBase" :class="{ 'is-scroll': state.scrolled >= 60, 'is-open': state.open }">
        <nuxt-link to="/">
            <img class="HeaderBase_logo" :src="assets.logo" />
        </nuxt-link>

        <button-base class="HeaderBase_burger" :modifiers="['round', 's', 'secondary']" icon-before="bars" @click="state.open = true" />

        <nav class="HeaderBase_nav">
            <button-base class="HeaderBase_close" :modifiers="['round', 's', 'secondary']" icon-before="times" @click="state.open = false"/>

            <a href="https://www.meetup.com/fr-FR/antiswipe-lgbt" target="_blank" class="d-inline-block mr-20 d-none@s">
                <img class="d-block" :src="assets.meetup" :width="18" />
            </a>
            
            <a href="https://www.instagram.com/antiswipe.lgbt/" target="_blank" class="d-inline-block mr-20 d-none@s">
                <img class="d-block" :src="assets.instagram" :width="18" />
            </a>

            <a href="https://discord.gg/ckdjYscrwQ" target="_blank" class="d-inline-block mr-20 d-none@s">
                <img class="d-block" :src="assets.discord" :width="18" />
            </a>

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

            <button-base class="HeaderBase_cta mt-20@s" tag="nuxt-link" :to="{ name: 'asso-join' }" :modifiers="['s']" @click="state.open = false">
                Adhérer à l'asso
            </button-base>

            <div class="mt-20 fxa-center d-none d-flex@s">
                <a href="https://www.meetup.com/fr-FR/antiswipe-lgbt" target="_blank" class="d-inline-block mh-10">
                    <img class="d-block" :src="assets.meetup" :width="22" />
                </a>
                
                <a href="https://www.instagram.com/antiswipe.lgbt/" target="_blank" class="d-inline-block mh-10">
                    <img class="d-block" :src="assets.instagram" :width="22" />
                </a>

                <a href="https://discord.gg/ckdjYscrwQ" target="_blank" class="d-inline-block mh-10">
                    <img class="d-block" :src="assets.discord" :width="22" />
                </a>
            </div>
        </nav>
    </header>
</template>

<script>
import logo from '@/assets/img/logo/logo-lgbt.png'
import instagram from '@/assets/img/svg/instagram.svg'
import discord from '@/assets/img/svg/discord.svg'
import meetup from '@/assets/img/svg/meetup.svg'

export default {
    name: 'HeaderBase',
    data: () => ({
        assets: { logo, instagram, discord, meetup },
        state: {
            scrolled: 0,
            open: false
        },
        navigation: []
    }),
    mounted () {
        this.$data.navigation = [
            { id: 0, title: `Nos événements`, to: { path: '/events' } }        ]

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