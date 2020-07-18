<template>
    <div class="TestimonyCard" :class="[ getRandomColor() ]">
        <div class="TestimonyCard_content">
            <div class="TestimonyCard_image">
                <icon-base :width="100" name="character-1" />
            </div>
            <div class="TestimonyCard_name">
                Alicia
            </div>
        </div>

        <div class="TestimonyCard_quote" v-if="quote">
            {{ quote }}
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import IconBase from '@/components/base/IconBase'

export default {
    name: 'TestimonyCard',
    components: { IconBase },
    props: {
        quote: { type: String, default: '' }
    },
    methods: {
        getRandomColor () {
            const colors = ['TestimonyCard--blueberry', 'TestimonyCard--cherry', 'TestimonyCard--pineapple']

            return colors[Vue.randomBetween(0, colors.length - 1)]
        }
    }
}
</script>