<template>
    <div class="TestimonyCards row-l">
        <div class="TestimonyCards_rail col-4" v-for="i in 3" :key="i">
            <testimony-card
                v-for="i in 4"
                class="TestimonyCards_card"
                :key="i"
            />
        </div>
    </div>
</template>

<script>
import TestimonyCard from './TestimonyCard'

export default {
    name: 'TestimonyCards',
    components: { TestimonyCard }
}
</script>