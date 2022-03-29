<template>
    <div class="TestimonyCards row" :class="{ 'is-active': state.active }">
        <div class="TestimonyCards_rail col-4" v-for="(rail, i) in rails" :key="i">
            <testimony-card
                v-for="card in rail"
                class="TestimonyCards_card"
                :style="{ '--delay': card.delay + 'ms' }"
                v-bind="card"
                :key="card.id"
            />
        </div>
    </div>
</template>

<script>
import TestimonyCard from './TestimonyCard'

export default {
    name: 'TestimonyCards',
    components: { TestimonyCard },
    data: () => ({
        state: {
            active: false
        }
    }),
    computed: {
        items () {
            return [
                { id: 0, delay: 0, name: 'Aurane', color: 'blueberry', avatar: 'team/aurane' },
                { id: 1, delay: 400, name: 'Théotime', color: 'banana', avatar: 'team/theotime' },
                { id: 2, delay: 200, name: 'Corentin', color: 'cherry', avatar: 'team/corentin' },
                { id: 3, delay: 600, name: 'Christopher', color: 'grape', avatar: 'team/christopher' },
                { id: 4, delay: 800, name: 'Élodie', color: 'plum', avatar: 'team/elodie' },
                { id: 5, delay: 1000, name: 'Alexandre', color: 'cherry', avatar: 'team/alexandre' },
            ]
        },
        rails () {
            const chunks = []
            let chunkCount = 3
            let arr = this.items.slice()

            while (arr.length) {
                const chunkSize = Math.ceil(arr.length / chunkCount--)
                const chunk = arr.slice(0, chunkSize)
                
                chunks.push(chunk)
                arr = arr.slice(chunkSize)
            }
            
            return chunks
        }
    },
    mounted () {
        this.$data.state.active = true
    }
}
</script>