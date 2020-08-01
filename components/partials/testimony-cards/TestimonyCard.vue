<template>
    <div class="TestimonyCard" :class="[ `TestimonyCard--${ color }` ]">
        <div class="TestimonyCard_content">
            <div class="TestimonyCard_image">
                <icon-base class="TestimonyCard_character" :name="character" />
            </div>
            <div class="TestimonyCard_name">
                {{ name }}
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
        name: { type: String, default: '' },
        character: { type: String, default: 'character-1' },
        color: { type: String, default: 'cherry' },
        quote: { type: String, default: '' }
    },
    methods: {
    }
}
</script>