<template>
    <footer class="FooterBase">
        <div class="FooterBase_wrapper Wrapper">
            
            <div class="FooterBase_logoContainer mr-60">
                <nuxt-link :to="localePath('/')">
                    <icon-base class="FooterBase_logo" name="logos/antiswipe" />
                </nuxt-link>

                <p class="ft-s-medium mt-30 color-cherry">Créé avec 💖 par la Team antiswipe. </p>
            </div>

            <div class="row-xs fx-grow">
                <div class="col-4" v-for="(col, i) in navigation" :key="i">
                    <div class="FooterBase_section" v-for="(section, j) in col" :key="j">
                        <p class="ft-title-s-bold mb-10" v-if="section.title">{{ section.title }}</p>

                        <div class="FooterBase_item" v-for="(item, i) in section.items" :key="i">
                            <link-base
                                class="FooterBase_link"
                                :tag="item.tag"
                                :link="item.link"
                                :target="item.target"
                                :attrs="item.attrs"
                            >
                                {{ item.label }}
                            </link-base>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterBase',
    data: () => ({
        navigation: []
    }),
    mounted () {
        this.$data.navigation = [
            [
                {
                    title: 'Explorer le site',
                    items: [
                        { label: `Page d'accueil`, tag: 'nuxt-link', attrs: {
                            to: this.localePath('/')
                        } }
                    ]
                },
            ],
            [
                {
                    title: 'Nous soutenir',
                    items: [
                        { label: `Adhérer à l'association`, link: 'https://bit.ly/antiswipe-adhesion', target: '_blank' },
                        { label: `Faire un don`, link: 'https://bit.ly/antiswipe-donation', target: '_blank' }
                    ]
                }
            ],
            [
                {
                    title: 'Liens utiles',
                    items: [
                        { label: `Charte de conduite`, tag: 'nuxt-link', attrs: {
                            to: this.localePath({ name: 'pages-slug', params: { slug: 'charte' } })
                        } },
                        { label: `Groupe Meetup`, link: 'https://www.meetup.com/fr-FR/antiswipe-lgbt', target: '_blank' }
                    ]
                }
            ]
        ]
    }
}
</script>