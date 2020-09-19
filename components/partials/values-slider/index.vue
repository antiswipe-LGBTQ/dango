<template>
    <section class="ValuesSlider" :style="{ height: maxHeight + 'px' }" @click="onClick">
        <div
            v-for="(slide, i) in items"
            class="ValuesSlider_slide"
            :class="[ `ValuesSlider_slide--${slide.color}`, { 'is-active': i <= state.current } ]"
            ref="slide"
            :key="slide.id"
        >
            <div class="ValuesSlider_wrapper Wrapper Wrapper--s">
                <div class="ValuesSlider_nav">
                    <div class="ValuesSlider_link" :class="{ 'is-active': i >= 0 }">tangible</div>
                    <div class="ValuesSlider_separator" :class="{ 'is-active': i >= 2 }"></div>
                    <div class="ValuesSlider_link" :class="{ 'is-active': i >= 1 }">bienveillant</div>
                    <div class="ValuesSlider_separator" :class="{ 'is-active': i >= 2 }"></div>
                    <div class="ValuesSlider_link" :class="{ 'is-active': i >= 2 }">inattendu</div>
                </div>
                <div class="fx-no-shrink ValuesSlider_left">
                    <h2 class="ValuesSlider_title ft-title-5xl d-inline-block" :class="[ `underline-${slide.color}` ]"><b>{{ slide.title }}</b></h2>
                    <p class="ValuesSlider_subtitle ft-title-xl"><b>{{ slide.subtitle }}</b></p>
                </div>
                <div class="max-width-m m-auto" v-html="slide.text"></div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ValuesSlider',
    data: () => ({
        state: {
            current: 0
        },
        maxHeight: 0
    }),
    computed: {
        items () {
            return [
                { id: 0, title: `tangible`, subtitle: `ce qui est concret, sensible.`, text: `<b>Si toi aussi tu en as un peu marre de devoir passer par les applis pour rencontrer du monde, tu es au bon endroit.</b><br><br> Nous organisons des événements originaux et variés dans la région parisienne. <b>Et toujours gratuits.</b>`, color: 'cherry' },
                { id: 1, title: `bienveillant`, subtitle: `attentif au bonheur d'autrui.`, text: `<b>Si toi aussi tu en as un peu marre de devoir passer par les applis pour rencontrer du monde, tu es au bon endroit.</b><br><br> Nous organisons des événements originaux et variés dans la région parisienne. <b>Et toujours gratuits.</b>`, color: 'blueberry' },
                { id: 2, title: `inattendu`, subtitle: `auquel on ne s'attendait pas.`, text: `<b>Si toi aussi tu en as un peu marre de devoir passer par les applis pour rencontrer du monde, tu es au bon endroit.</b><br><br> Nous organisons des événements originaux et variés dans la région parisienne. <b>Et toujours gratuits.</b>`, color: 'pineapple' }
            ]
        },
        current () {
            return this.items[this.$data.state.current]
        }
    },
    mounted () {
        this.$refs.slide.forEach(slide => {
            this.$data.maxHeight = slide.offsetHeight > this.$data.maxHeight ? slide.offsetHeight : this.$data.maxHeight
        })
    },
    methods: {
        onClick () {
            this.$data.state.current = this.$data.state.current < this.items.length - 1 ? this.$data.state.current + 1 : 0
        }
    }
}
</script>