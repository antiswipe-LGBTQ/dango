<template>
    <section class="HomePage_images">
        <slider-simple :header="false" :gutter="0" :snap="false">
            <img
                class="HomePage_image"
                v-for="image in images"
                :src="image.src"
                :key="image.id"
            >
        </slider-simple>
    </section>
</template>

<script>
import SliderSimple from '@/components/interactive/SliderSimple'

export default {
    name: 'ImagesSlider',
    components: { SliderSimple },
    async fetch () {
        await this.$store.dispatch('images/fetch')
    },
    computed: {
        images () {
            return Object.values(this.$store.state.images.items)
        }
    }
}
</script>