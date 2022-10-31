<template>
    <div class="Homepage_about p-relative">
        <div id="about" class="anchor"></div>

        <div class="row row-no-gutters d-block@s">
            <div class="col-6 col-12@s">
                <div class="Homepage_aboutContent">
                    <h1 class="ft-title-2xl mb-20 text-center@s">
                        3. Des nouvelles rencontres
                    </h1>

                    <p class="ft-title-l">Bienveillance &</p>
                    <p>Timides</p>

                    <p class="ft-title-l mt-20">Diversité & ouverture d'espirt</p>
                    <p>Diversité / mixité</p>

                    <p class="ft-title-l mt-20">Des potes, et plus si affinités</p>
                    <p>Que tu sois célibataire, en couple, en recherche ou pas, nous ne faisons pas de distinction. Certains de nos membres trouvent un super groupe de potes, un partenaire de sport, ou le grand amour !</p>
                </div>
            </div>
            <div class="Homepage_aboutTeam col-6 p-relative col-12@s">
                <transition-group tag="div" name="fade" class="ChatWindow">
                    <div class="ChatBubble" :class="[`is-${chat.position}`]" v-for="chat in chats" :key="chat.id">
                        {{ chat.text }}
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import TeamSection from '@/components/partials/home/team-section'
import ScrollerText from '@/components/interactive/ScrollerText'

export default {
    name: 'AboutSection',
    components: { TeamSection, ScrollerText },
    data: () => ({
        currentChat: 0,
        availableChats: [
            { text: `J'étais assez frustré par les applis, que des expériences négatives, des dates foireux. Je rêvais de trouver le prince charmant à à l'ancienne. On ne peut pas dire que j'ai trouvé chaussure à mon pied, mais j'ai fait de belles rencontres et je crois avoir de bons copains grâce à Antiswipe.` },
            { text: `Vous êtes la raison pour laquelle j'ai adoré mon premier mois à Paris.` },
            { text: `Je suis fier de faire partie de ce groupe où je me sens accepté comme je suis. Ça représente un pas de plus en avant contre l'anxiété sociale. ❤️` },
            { text: `Restez tel.le.s que vous êtes ! Vous savez inclure les gens et les mettre à l'aise :)` },
            { text: `Pouvoir parler de tout et n'importe quoi, même de sujet sérieux ou sensible, sans prise de tête ou quoi. Tout le monde était sympa et moi qui suis timide, introvertie et qui ne connaissais personne j'ai passé un super moment sans jamais me sentir anxieuse ou autre :D` },
            { text: `merci de m'avoir fait rencontrer un garçon extra que j'aime ++++++++++++++++` },
            { text: `Longtemps que je ne m'étais pas senti aussi bien dans une communauté. Les évents et les ami.es que je me suis fait ici m'aident à tenir debout. Merci !` },
            { text: `c’est un bon moyen de rencontrer des gens sans la pression du date, ca te fait découvrir pleins d’endroits chouettes et on y rencontre pleins de gens differents :)` },
            { text: `Très envie de vous découvrir tous et de vous aider dans cet initiative que je trouve très belle ^^` },
            { text: `La cohésion, les anciens viennent naturellement vers les nouveaux` },
            { text: `événements toujours variés, formats accueillants pour les timides et les introverti-es` },
            { text: `Des rencontres marquantes, il y en a eu beaucoup pendant ces trois ans : la réussite c'est d'arriver à se connecter amicalement et à créer des liens avec des gens à côté desquels on serait passé sur les applis.` },
            { text: `tout le monde parle avec tout le monde, des profils différents` },
            { text: `J'avais l'impression d'être la bienvenue alors que je ne connaissais personne.` },
            { text: `Beaucoup de membre, des personnalités sympas avec qui j'ai beaucoup discuté. Les rencontres ne sont pas focalisées sur l'amour +1` },
            { text: `Pas mal de monde, beaucoup d'échanges, une véritable ouverture d'esprit et des organisateurs motivés et dispo` },
            { text: `J'ai adhéré car je soutiens totalement l'association, ce qu'elle représente, et je suis ravi d'y contribuer à mon échelle` },
            { text: `Antiswipe est de mon point de vue un petit ilot protecteur pour se retrouver et reprendre des forces avant de se confronter à l'extérieur.` },
            { text: `Merci au bureau pour cette superbe année <3` },
            { text: `C'est un super moyen de rencontrer des gens et j'en suis ravie :)` }
        ],
        chats: []
    }),
    mounted () {
        this.addChat()

        setInterval(() => {
            this.addChat()
        }, 6000)
    },
    methods: {
        addChat () {
            this.currentChat = this.currentChat < this.availableChats.length - 1 ? this.currentChat + 1 : 0

            let chat = { ...this.availableChats[this.currentChat] }

            chat.id = Math.random()
            chat.position = this.currentChat % 2 == 0 ? 'left' : 'right'

            this.chats = [ chat, ...this.chats ]
        }
    }
}
</script>

<style lang="scss" scoped>
.Homepage_aboutContent {
    padding: 60px;
}

.Homepage_aboutTeam {
    background-color: var(--color-cherry-2xweak);
    overflow: hidden;
    position: relative;
}

.ChatWindow {
    display: flex;
    flex-direction: column-reverse;
    padding: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.ChatBubble {
    padding: 15px 25px;
    font: var(--ft-m-medium);
    line-height: 1.4;
    border-radius: 12px;
    margin-top: 15px;

    &.is-left {
        margin-right: 60px;
        border-bottom-left-radius: 0;
        background-color: var(--color-banana);
    }

    &.is-right {
        margin-left: 60px;
        border-bottom-right-radius: 0;
        background-color: var(--color-plum);
    }
}

.fade-enter-active {
    transition: all 250ms;
}

.fade-leave, .fade-leave-to {
    transition: none;
    display: none;
}

.fade-enter {
    opacity: 0;
    transform: translateY(5px);
}

.fade-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.transition-list-active {
    transition: all 250ms;
}

.transition-list-enter, .transition-list-leave-to {
    opacity: 0;
    transform: translateY(5px);
}

.transition-list-leave-active {
    position: absolute;
}
</style>