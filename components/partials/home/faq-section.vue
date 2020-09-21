<template>
    <div class="Homepage_faq">
        <div class="Wrapper Wrapper--s pt-100 pb-60 pv-40@xs">
            <div class="row d-block@xs">
                <div class="col-6 col-12@xs" v-for="(questions, i) in cols" :key="i">
                    <h2 class="ft-title-3xl color-pineapple mb-60 ft-title-2xl@s text-center@s mb-40@s" v-if="i == 0">
                        <b>Questions fréquentes</b>
                    </h2>

                    <div
                        v-for="question in questions"
                        class="mb-40"
                        :key="question.id"
                    >
                        <p class="ft-title-l color-pineapple ft-bold mb-10">{{ question.title }}</p>
                        <truncated-text :text="question.text"  :modifiers="['pineapple']" :max="150" />
                    </div>
                </div>
            </div>

            <div class="text-center mt-10">
                <h3 class="ft-title-2xl color-pineapple mb-20">
                    <b>D'autres questions ?</b>
                </h3>

                <button-base :modifiers="['pineapple', 'secondary']" @click="openChat">
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
                { id: 1, title: "🥶 Je suis timide, comment me lancer ?", text: "Les 30 premières minutes de chaque événement sont réservées à l’accueil des nouveaux. Nous organisons souvent des jeux pour apprendre à se connaître en douceur et briser la glace ! N’hésite pas à venir accompagné."},
                { id: 2, title: "🍆 C'est un groupe réservé aux célibataires ?", text: "<b>Pas du tout !</b> Chaque personne vient pour ses propres raisons, que tu sois célibataire, en couple (tu peux même venir avec ton amoureux(se) !) ou juste pour te faire des ami(e)s."}
            ], [
                { id: 0, title: "👋 Puis-je venir accompagné(e) ?", text: "<b>Bien sûr !</b> Et on t’encourage à le faire ! Quand tu t’inscris à un événement, tu as la possibilité de choisir le nombre de personnes qui viendront."},
                { id: 1, title: "👀 Combien de personnes sont là en général ?", text: "<b>Ça dépend vraiment des événements.</b> Nous tournons entre 15 et 30 personnes en général et nous essayons de ne pas dépasser cette limite pour conserver un esprit le plus convivial possible."},
                { id: 2, title: "👯‍♂️ Vos événements sont-ils mixtes ?", text: "<b>Toujours !</b> On ne fait pas de distinction de sexe, genres ou orientation. En général, la représentation est plutôt équilibrée."}
            ]
        ]
    }),
    methods: {
        openChat () {
            console.log('open chat')
            if (window.FB && window.FB.CustomerChat) window.FB.CustomerChat.showDialog()
        }
    }
}
</script>