<template>
    <div class="TeamSection">

        <button-base class="TeamSection_left" @click="prev" :modifiers="['secondary', 'round']" fa="chevron-left" />
        <button-base class="TeamSection_right" @click="next" :modifiers="['secondary', 'round']" fa="chevron-right" />

        <div class="TeamSection_slide" v-for="member in members" :key="member.id">
            <testimony-card class="TeamSection_card" :name="member.name" />
            
            <div class="mt-60">
                <h3 class="ft-title-l ft-bold">Quel est ton rôle dans l'association ?</h3>
                <truncated-text class="mt-5" :text="member.questions.what.text" :max="100" />
            </div>

            <div class="mt-20">
                <h3 class="ft-title-l ft-bold">Pourquoi antiswipe ?</h3>
                <truncated-text class="mt-5" :text="member.questions.why.text" :max="100" />
            </div>

            <div class="mt-20">
                <h3 class="ft-title-l ft-bold">{{ member.questions.custom.title }}</h3>
                <truncated-text class="mt-5" :text="member.questions.custom.text" :max="100" />
            </div>
        </div>
    </div>
</template>

<script>
import TestimonyCard from '@/components/partials/testimony-cards/TestimonyCard'
import TruncatedText from '@/components/interactive/TruncatedText'

export default {
    name: 'TeamSection',
    components: { TestimonyCard, TruncatedText },
    async fetch () {
        await this.$store.dispatch('team/fetch')
    },
    data: () => ({
        state: {

        }
    }),
    computed: {
        members () {
            return Object.values(this.$store.state.team.items)
        }
    },
    methods: {
        prev () {

        },
        next () {

        }
    }
}
</script>