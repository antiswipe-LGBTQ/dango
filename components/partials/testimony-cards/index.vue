<template>
    <div class="TestimonyCards row">
        <div class="TestimonyCards_rail col-4" v-for="(rail, i) in rails" :key="i">
            <testimony-card
                v-for="card in rail"
                class="TestimonyCards_card"
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
    computed: {
        items () {
            return [
                { id: 0, name: 'Mika', color: 'cucumber', character: 'character-1' },
                { id: 1, name: 'Alicia', color: 'cherry', character: 'character-4' },
                { id: 2, name: 'Tommy', color: 'pineapple', character: 'character-2' },
                { id: 3, name: 'Mika', color: 'cherry', character: 'character-1' },
                { id: 4, name: 'Meghan', color: 'blue', character: 'character-5' },
                { id: 5, name: 'Alicia', color: 'plum', character: 'character-3' },
                { id: 6, name: 'Nathan', color: 'plum', character: 'character-2' },
                { id: 7, name: 'Nathan', color: 'grape', character: 'character-2' },
                { id: 7, name: 'Julie', color: 'cucumber', character: 'character-4' },
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
    }
}
</script>