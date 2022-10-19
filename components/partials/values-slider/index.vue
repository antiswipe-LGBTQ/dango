<template>
    <div class="bg-banana-2xweak">
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
                        <h2 class="ValuesSlider_title ft-title-3xl d-inline-block mb-10" :class="[ `underline-${slide.color}` ]">{{ slide.title }}</h2>

                        <!-- <p class="ValuesSlider_subtitle ft-title-xl ft-title-l@s"><b>{{ slide.subtitle }}</b></p> -->

                        <div class="ValuesSlider_content mb-40" v-html="slide.text"></div>

                        <div
                            v-for="question in slide.questions"
                            class="mt-20"
                            :key="question.id"
                        >
                            <p class="ft-title-l ft-bold mb-10">{{ question.title }}</p>

                            <truncated-text class="color-ft" :text="question.text"  :modifiers="[slide.color]" :max="80" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
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
                { id: 0, title: `tangible`, subtitle: `ce qui est concret, sensible.`, text: `<b>Notre passion : créer des événements qui favorisent la rencontre.</b><br><br> Petit nombre de participants, lieux choisis avec soin et activités originales : <strong>c’est notre formule magique pour un événement convivial qui rapproche.</strong>`, color: 'cherry', questions: [
                    { id: 0, title: "C’est vraiment gratuit ?", text: "<b>Oui !</b> Tu peux participer à autant d’événements que tu veux sans jamais rien payer. Nous sommes une association à but non-lucratif : si tu veux nous soutenir, tu auras la possibilité d’adhérer pour 15€ / an."},
                    { id: 1, title: "Puis-je venir accompagné·e ?", text: "<b>Bien sûr !</b> Et on t’encourage à le faire ! Quand tu t’inscris à un événement, tu as la possibilité de choisir le nombre de personnes qui viendront avec toi."}
                ]},
                
                { id: 1, title: `bienveillant`, subtitle: `attentif au bonheur d'autrui.`, text: `<b>Nous apportons une attention particulière à ce que chacun·e puisse se sentir à l’aise rapidement.</b><br><br> Car il n’est pas forcément facile de sociabiliser en situation de groupe, nous avons imaginé plein de manières de te faciliter la tâche : <strong>jeux icebreakers, activités conviviales, animateurs dédiés...</strong>`, color: 'blueberry', questions: [
                    { id: 0, title: "Je suis timide, comment me lancer ?", text: "<b>Notre groupe plaît beaucoup aux introverti·e·s & timides.</b> Nous organisons des petits jeux au début pour apprendre à se connaître en douceur et grâce à nos cartes de conversations tu ne seras jamais à court de sujets à aborder !"},
                    { id: 1, title: "Combien de personnes sont là en général ?", text: "<b>Ça dépend vraiment des événements.</b> Nous tournons entre 15 et 30 personnes en général et nous essayons de ne pas dépasser cette limite pour conserver un esprit le plus convivial possible.<br><br>Si un événement est complet, tu as la possibilité de te mettre en liste d'attente : s'il y a des désistement au dernier moment, tu seras automatiquement inscrit·e."}
                ] },

                { id: 2, title: `inattendu`, subtitle: `auquel on ne s'attendait pas.`, text: `<b>Chacun·e vient pour ses propres raisons : il y a toujours de nouvelles personnes intéressantes à découvrir.</b><br><br> Nos rencontres sont diversifiées et mixtes : genre, sexualité, origine, situation amoureuse… C’est ce qui fait la beauté de la rencontre : <strong>on ne sait jamais à qui s’attendre.</strong>`, color: 'banana', questions: [
                    { id: 1, title: "C'est un groupe réservé aux célibataires ?", text: "<b>Pas du tout !</b> Chaque personne vient pour ses propres raisons, que tu sois célibataire, en couple (tu peux même venir avec ton amoureux·se !) ou juste pour te faire des ami·e·s.<br><br>Ce qui est génial avec antiswipe c'est que tu n'es pas dans un contexte de drague : il n'y a pas cette pression de devoir plaire qu'on peut retrouver dans d'autres endroits. <b>Nos événements ressemblent davantage à des sorties entres ami·e·s qu'à un speed-dating.</b>"},
                    { id: 2, title: "Vos événements sont-ils mixtes ?", text: "<b>Toujours !</b> On ne fait pas de distinction de sexe, genres ou orientation. En général, la représentation est plutôt équilibrée."}
                ] }
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