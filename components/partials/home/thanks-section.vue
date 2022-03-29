<template>
    <section class="HomePage_thanks">
        <div class="Wrapper Wrapper--s">
            <div class="HomePage_thanksContainer">
                <p class="ft-title-2xl fx-no-shrink ft-title-xl@s"><b>Un grand merci à</b></p>

                <scroller-text class="HomePage_scroller" :modifiers="['gradient']" :items="subscribers.map(s => s.name)" />

                <div class="ft-m">
                    <p>De croire en des rencontres plus humaines et de nous avoir fait confiance en adhérant à l'association. On vous aime !</p>
                    <p class="mt-10 ft-bold">L'équipe antiswipe. 💖</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ScrollerText from '@/components/interactive/ScrollerText'

import { randomizeArray } from '@/utils/base-utils'

export default {
    name: 'ThanksSection',
    components: { ScrollerText },
    async fetch () {
        await this.$store.dispatch('members/fetch')
    },
    computed: {
        subscribers () {
            return randomizeArray(Object.values(this.$store.getters['members/find']({ isSubscriber: true })))
        }
    }
}
</script>