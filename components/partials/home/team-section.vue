<template>
    <div class="TeamSection" :class="[ `is-${state.member ? state.member.color : ''}` ]">

        <button-base class="TeamSection_left" @click="prev" :modifiers="[ (state.member ? state.member.color : ''), 'secondary', 'round']" icon-before="chevron-left" />
        <button-base class="TeamSection_right" @click="next" :modifiers="[ (state.member ? state.member.color : ''), 'secondary', 'round']" icon-before="chevron-right" />
        
        <div class="TeamSection_slider" :style="{ '--position': state.position }">
            <!-- <div
                v-for="(member, i) in members"
                class="TeamSection_slide"
                :class="{ 'is-active': i == state.position }"
                :key="member.id"
            >
                <testimony-card class="TeamSection_card" v-bind="member" :subtitle="member.role" />

                <div>
                    <div class="TeamSection_paragraph mt-60">
                        <h3 class="ft-title-l ft-bold">Quel est ton rôle dans l'association ?</h3>
                        <truncated-text class="mt-5" :modifiers="[ member.color ]" :text="member.questions.what.text" :max="100" ref="truncated" />
                    </div>

                    <div class="TeamSection_paragraph mt-20">
                        <h3 class="ft-title-l ft-bold">Pourquoi antiswipe ?</h3>
                        <truncated-text class="mt-5" :modifiers="[ member.color ]" :text="member.questions.why.text" :max="100" ref="truncated" />
                    </div>

                    <div class="TeamSection_paragraph mt-20">
                        <h3 class="ft-title-l ft-bold">{{ member.questions.custom.title }}</h3>
                        <truncated-text class="mt-5" :modifiers="[ member.color ]" :text="member.questions.custom.text" :max="100" ref="truncated" />
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import TestimonyCard from '@/components/partials/testimony-cards/TestimonyCard'
import TruncatedText from '@/components/interactive/TruncatedText'

import { randomizeArray } from '@/utils/base-utils'

export default {
    name: 'TeamSection',
    components: { TestimonyCard, TruncatedText },
    async fetch () {
        await this.$store.dispatch('team/fetch')
    },
    data: () => ({
        state: {
            member: {
                color: 'cherry'
            },
            position: 0
        }
    }),
    computed: {
        members () {
            return randomizeArray(Object.values(this.$store.state.team.items))
        }
    },
    mounted () {
        // this.goTo(0)
    },
    methods: {
        prev () {
            let position = this.$data.state.position - 1

            if (position < 0) position = this.members.length - 1

            this.goTo(position)
        }, 
        next () {
            let position = this.$data.state.position + 1

            if (position > this.members.length - 1) position = 0

            this.goTo(position)
        },
        goTo (position) {
            this.$refs.truncated.forEach(text => text.collapse())
            
            this.$data.state.member = this.members[position] ? this.members[position] : null
            this.$data.state.position = position
        }
    }
}
</script>