<template>
    <div class="Homepage_faq p-relative">
        <div id="questions" class="anchor"></div>

        <div class="Wrapper Wrapper--s pt-100 pb-60 pv-40@xs">
            <div class="row d-block@xs">
                <div class="col-6 col-12@xs" v-for="(questions, i) in cols" :key="i">
                    <h2 class="ft-title-3xl color-banana mb-60 ft-title-2xl@s text-center@s mb-40@s ft-title-2xl@xs" v-if="i == 0">
                        <b>Questions fréquentes</b>
                    </h2>

                    <div
                        v-for="question in questions"
                        class="mb-40"
                        :key="question.id"
                    >
                        <p class="ft-title-l color-banana ft-bold mb-10">{{ question.title }}</p>
                        <truncated-text :text="question.text"  :modifiers="['banana']" :max="150" />
                    </div>
                </div>
            </div>

            <div class="text-center mt-10">
                <h3 class="ft-title-2xl color-banana mb-20 ft-title-xl@xs">
                    <b>D'autres questions ?</b>
                </h3>

                <button-base :modifiers="['banana', 'secondary']" @click="openChat">
                    On vous répond en direct !
                </button-base>
            </div>
        </div>
    </div>
</template>

<script>
import TruncatedText from '@/components/interactive/TruncatedText'

export default {
    name: 'FaqSection',
    components: { TruncatedText },
    data: () => ({
        cols: [
            [
                { id: 0, title: "💎 C’est vraiment 100% gratuit ?", text: "<b>Oui !</b> Tu peux participer à autant d’événements que tu veux sans jamais rien payer. Nous sommes une association à but non-lucratif : si tu veux nous soutenir, tu auras la possibilité d’adhérer pour 15€ / an."},
                { id: 2, title: "💕 C'est un groupe réservé aux célibataires ?", text: "<b>Pas du tout !</b> Chaque personne vient pour ses propres raisons, que tu sois célibataire, en couple (tu peux même venir avec ton amoureux·se !) ou juste pour te faire des ami·e·s.<br><br>Ce qui est génial avec antiswipe c'est que tu n'es pas dans un contexte de drague : il n'y a pas cette pression de devoir plaire qu'on peut retrouver dans d'autres endroits. <b>Nos événements ressemblent davantage à des sorties entres ami·e·s qu'à un speed-dating.</b>"},
                { id: 1, title: "🥶 Je suis timide, comment me lancer ?", text: "En général, 30 premières minutes des événements sont réservées à l’accueil des nouveaux·lles. Nous organisons souvent des petits jeux pour apprendre à se connaître en douceur  et grâce à nos cartes de conversations tu ne seras jamais à court de sujets à aborder !"}
            ], [
                { id: 0, title: "👋 Puis-je venir accompagné·e ?", text: "<b>Bien sûr !</b> Et on t’encourage à le faire ! Quand tu t’inscris à un événement, tu as la possibilité de choisir le nombre de personnes qui viendront."},
                { id: 1, title: "👀 Combien de personnes sont là en général ?", text: "<b>Ça dépend vraiment des événements.</b> Nous tournons entre 15 et 30 personnes en général et nous essayons de ne pas dépasser cette limite pour conserver un esprit le plus convivial possible.<br><br>Si un événement est complet, tu as la possibilité de te mettre en liste d'attente : s'il y a des désistement au dernier moment, tu seras automatiquement inscrit·e."},
                { id: 2, title: "👯‍♂️ Vos événements sont-ils mixtes ?", text: "<b>Toujours !</b> On ne fait pas de distinction de sexe, genres ou orientation. En général, la représentation est plutôt équilibrée."}
            ]
        ]
    }),
    methods: {
        openChat () {
            if (window.FB && window.FB.CustomerChat) window.FB.CustomerChat.showDialog()
        }
    }
}
</script>