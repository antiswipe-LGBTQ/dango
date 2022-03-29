<template>
    <div class="Wrapper pv-60">
        <p class="ft-title-2xl max-width-s mb-30 mb-0@m">
            qu'est-ce qui rend antiswipe si spéciale ?
        </p>

        <section class="ValuesSlider row">
            <div class="col-4 col-12@m" v-for="(slide, i) in items" :key="slide.id">
                <div
                    class="ValuesSlider_slide mt-30@m"
                    :class="[ `ValuesSlider_slide--${slide.color}`, { 'is-active': i <= state.current } ]"
                    ref="slide"
                >
                    <h2 class="ValuesSlider_title ft-title-3xl d-inline-block mb-10" :class="[ `underline-${slide.color}` ]"><b>{{ slide.title }}</b></h2>

                    <!-- <p class="ValuesSlider_subtitle ft-title-xl ft-title-l@s"><b>{{ slide.subtitle }}</b></p> -->

                    <div v-html="slide.text"></div>
                </div>
            </div>
        </section>
    </div>
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
                { id: 0, title: `tangible`, subtitle: `ce qui est concret, sensible.`, text: `<b>Notre passion : créer des événements qui favorisent la rencontre.</b><br><br> Petit nombre de participants, lieux choisis avec soin et activités originales : <b>c’est notre formule magique pour un événement convivial qui rapproche.</b>`, color: 'cherry' },
                { id: 1, title: `bienveillant`, subtitle: `attentif au bonheur d'autrui.`, text: `<b>Nous apportons une attention particulière à ce que chacun·e puisse se sentir à l’aise rapidement.</b><br><br> Car il n’est pas forcément facile de sociabiliser en situation de groupe, nous avons imaginé plein de manières de te faciliter la tâche : <b>jeux icebreakers, activités conviviales, animateurs dédiés...</b>`, color: 'blueberry' },
                { id: 2, title: `inattendu`, subtitle: `auquel on ne s'attendait pas.`, text: `<b>Chacun·e vient pour ses propres raisons : il y a toujours de nouvelles personnes intéressantes à découvrir.</b><br><br> Nos rencontres sont diversifiées et mixtes : genre, sexualité, origine, situation amoureuse… C’est ce qui fait la beauté de la rencontre : <b>on ne sait jamais à qui s’attendre.</b>`, color: 'banana' }
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