<template>
    <section class="ValuesSlider pv-60" :class="current.color" @click="onClick">
        <div class="Wrapper Wrapper--s">
            <div class="d-flex fx-align-center">
                <div class="fx-no-shrink ValuesSlider_left">
                    <h2 class="ft-title-5xl d-inline-block underline-cherry"><b>{{ current.title }}</b></h2>
                    <p class="ft-title-xl"><b>{{ current.subtitle }}</b></p>
                </div>
                <div class="max-width-m m-auto" v-html="current.text"></div>
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
        }
    }),
    computed: {
        items () {
            return [
                { id: 0, title: `tangible`, subtitle: `ce qui est concret, sensible.`, text: `<b>Si toi aussi tu en as un peu marre de devoir passer par les applis pour rencontrer du monde, tu es au bon endroit.</b><br><br> Nous organisons des événements originaux et variés dans la région parisienne. <b>Et toujours gratuits.</b>`, color: [`bg-cherry-xweak`, `color-cherry-weak`] },
                { id: 1, title: `bienveillant`, subtitle: `attentif au bonheur d'autrui.`, text: `<b>Si toi aussi tu en as un peu marre de devoir passer par les applis pour rencontrer du monde, tu es au bon endroit.</b><br><br> Nous organisons des événements originaux et variés dans la région parisienne. <b>Et toujours gratuits.</b>`, color: [`bg-blueberry-weak`, `color-blueberry`] },
                { id: 2, title: `inattendu`, subtitle: `auquel on ne s'attendait pas.`, text: `<b>Si toi aussi tu en as un peu marre de devoir passer par les applis pour rencontrer du monde, tu es au bon endroit.</b><br><br> Nous organisons des événements originaux et variés dans la région parisienne. <b>Et toujours gratuits.</b>`, color: [`bg-pineapple-weak`, `color-pineapple`] }
            ]
        },
        current () {
            return this.items[this.$data.state.current]
        }
    },
    methods: {
        onClick () {
            this.$data.state.current = this.$data.state.current < this.items.length - 1 ? this.$data.state.current + 1 : 0
        }
    }
}
</script>