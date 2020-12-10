<template>
    <div class="JoinPage Page">
        <div class="LayoutDefault_banner">
            <div class="Wrapper Wrapper--xs text-center">
                <h1 class="ft-title-2xl-bold color-cherry mb-20 ft-title-xl-bold@xs">L'association antiswipe, c'est...</h1>

                <div class="row row--l d-block@xs">
                    <div class="col-4 text-center col-12@xs">
                        <p class="Homepage_aboutNumber ft-bold color-cherry">+70</p>
                        <p class="ft-s ph-5 m-auto width-2xs@xs">événements réussis depuis juin 2019</p>
                    </div>

                    <div class="col-4 text-center col-12@xs mt-20@xs">
                        <p class="Homepage_aboutNumber color-cherry">9</p>
                        <p class="ft-s ph-5 m-auto width-2xs@xs">organisateurs·trices super motivé·e·s</p>
                    </div>

                    <div class="col-4 text-center col-12@xs mt-20@xs">
                        <div class="Homepage_aboutNumber Homepage_aboutNumber--animated color-cherry">
                            <scroller-text class="Homepage_aboutCounter" :speed="400" :items="[1, 2, 3, 4, 5, 6, 7, 8, 9]" />
                            <scroller-text class="Homepage_aboutCounter" :speed="380" :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" />
                            <scroller-text class="Homepage_aboutCounter" :speed="340" :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" />
                            <scroller-text class="Homepage_aboutCounter" :speed="300" :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" />
                        </div>
                        <p class="ft-s ph-5 m-auto width-2xs@xs">un nombre incalculable de belles rencontres</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="Wrapper Wrapper--xs mb-60">
            <p class="ft-title-2xl-bold mt-60 mb-20 ft-title-xl-bold@xs">
                Adhérer à antiswipe
            </p>

            <p>Le 21 avril 2020, antiswipe est officiellement devenu une association à but non-lucratif. Cela nous permet notamment d'accepter des dons et des adhésions, en toute transparence.</p>

            <p class="mt-20">Le prix d'une adhésion est fixé à <span class="ft-title-xl-bold color-blueberry">15€ / an</span> :</p>

            <ul class="mt-10 pl-40">
                <li><b>Elle est optionnelle</b>, tu peux continuer à venir à nos événements sans jamais payer.</li>
                <li><b>Ce n'est pas un abonnement</b>, ce sera à toi de la renouveller l'année prochaine, si tu en as envie.</li>
            </ul>

            <p class="ft-title-xl-bold text-center mv-60">
                Mais alors, pourquoi devrais-je adhérer ?
            </p>

            <div class="Block max-width-m">
                <div class="Block_container p-30 p-20@xs">
                    <p class="ft-title-xl-bold color-cherry ft-title-l-bold@xs">
                        #1. Je permet à antiswipe de continuer ses activités gratuitement
                    </p>
                    
                    <p class="mt-20">
                        Nous faisons le choix de laisser nos événements gratuits pour accueillir tout le monde, peu importe la taille de son porte-monnaie. En contrepartie, nous avons besoin de vos dons car, même si nous sommes bénévoles, nous avons des frais de fonctionnement.
                    </p>
                </div>
            </div>

            <div class="Block Block--blueberry max-width-m mt-40 ml-auto">
                <div class="Block_container p-30 p-20@xs">
                    <p class="ft-title-xl-bold color-blueberry ft-title-l-bold@xs">
                        #2. J'investis dans un projet qui me tient à coeur
                    </p>
                    
                    <p class="mt-20">
                        antiswipe a démarré comme un organisateur d'événements. Mais c'est devenu l'ambition de changer la perspective sur la rencontre et d'aider les personnes qui se sentent isolées au milieu d'un océan de profils. Vos dons nous permettent de voir toujours plus loin.
                    </p>
                </div>
            </div>

            <div class="Block Block--pineapple max-width-m mt-40">
                <div class="Block_container p-30 p-20@xs">
                    <p class="ft-title-xl-bold color-pineapple ft-title-l-bold@xs">
                        #3. Je peux m'impliquer davantage dans la vie de l'association
                    </p>
                    
                    <p class="mt-20">
                        Les adhérent·e·s ont la possibilité de devenir Helpers. C'est-à-dire, s'impliquer ponctuellement & bénévolement sur certains projets de l'asso : animer un événement, participer à des ateliers de création, donner son avis sur un logo... C'est optionnel et sans engagement.
                    </p>
                </div>
            </div>
        </div>

        <div class="bg-blueberry-xweak">
            <div class="Wrapper Wrapper--s pv-60">
                <p class="ft-title-xl-bold color-blueberry max-width-s">Comment sont investis mes 15€ / an d'adhésion ?</p>

                <div class="JoinPage_chart mt-40">
                    <div class="JoinPage_category JoinPage_category--1">

                        <p class="ft-title-3xl-bold line-1 mb-20 mb-5@xs">60%</p>
                        pour investir dans nos projets & le matériel dont on a besoin (jeux de société, pin's, impression de flyers...). Le tout dans un seul but : <b>faciliter la rencontre pour tout le monde</b>.
                    </div>
                    <div class="JoinPage_category JoinPage_category--2">

                        <p class="ft-title-2xl-bold line-1 mb-20 mb-5@xs">30%</p>
                        pour couvrir les factures liées à notre site web, notre présence sur Meetup...
                    </div>
                    <div class="JoinPage_category JoinPage_category--3">

                        <p class="ft-title-xl-bold line-1 mb-10 mb-5@xs">10%</p>
                        de côté pour couvrir les petits imprévus lors des événements.
                    </div>
                    <div class="JoinPage_category JoinPage_category--4 color-ft-weak">

                        <p class="ft-title-l-bold line-1 mb-5 mb-5@xs">0%</p>
                        pour s'acheter de lamas 
                    </div>
                </div>

                <div class="mt-30 text-right max-width-s ml-auto color-ft-weak ft-s text-left@xs">
                    Estimations qui peuvent varier selon les impératifs du moment. Notamment si l'on a très très envie d'acheter des lamas.
                </div>
            </div>
        </div>

        <div class="bg-cherry-weak pv-100">
            <div class="Wrapper Wrapper--xs text-center">
                <p class="ft-title-xl-bold color-cherry mb-40 ft-title-l-bold@xs">
                    Alors, si toi aussi tu sais que la beauté d'une personne ne peut pas se résumer en 3 photos et 250 caractères, rejoins-nous !
                </p>

                <button-base tag="a" link="https://www.helloasso.com/associations/antiswipe/adhesions/devenir-adherent-d-antiswipe" target="_blank" :modifiers="[]">
                    Je soutiens antiswipe
                </button-base>
            </div>
        </div>

        <div class="Wrapper Wrapper--s pv-60">
            <p class="ft-title-2xl-bold text-center mb-60 ft-title-xl-bold@xs">
                Nous soutenir, autrement.
            </p>
            
            <div class="Block text-center ">
                <div class="Block_container p-30">
                    <div class="max-width-m m-auto">
                        <p class="ft-title-xl-bold color-cherry ft-title-l-bold@xs">
                            Tout le monde n'a pas les moyens de soutenir une association.
                        </p>
                        
                        <p class="mt-20">
                            Mais ton soutien moral est encore plus important à nos yeux.  C'est ici que tu peux nous le montrer, numériquement !
                        </p>

                        <particles-emitter
                            class="color-cherry ft-xl"
                            :icons="[ 'fas fa-heart', 'fal fa-heart', 'fas fa-heart' ]"
                            :max-emit="4"
                            :min-emit="2"
                        >
                            <button-base class="mt-40" :modifiers="['round', 'l']" icon-before="heart" @click.native="addLove" />
                        </particles-emitter>

                        <p class="ft-s-bold color-cherry mt-20">{{ hearts }} coeurs envoyés</p>
                    </div>
                </div>
            </div>

            <div class="row fx-align-start mt-30">
                <div class="col-6 col-12@xs">
                    <div class="Block Block--blueberry">
                        <div class="Block_container p-30">
                            <p class="ft-title-l-bold color-blueberry ft-title-l-bold@xs">
                                Don ponctuel ou mensuel
                            </p>
                            
                            <p class="mt-10">
                                Tu es déjà adhérent·e et tu souhaites en faire plus ? Tu ne fais pas partie du public qu'on vise mais tu souhaites quand même nous soutenir ?
                            </p>

                            <button-base class="mt-20" :modifiers="['s', 'blueberry']" tag="a" target="_blank" link="https://www.helloasso.com/associations/antiswipe/formulaires/1">
                                Je fais un don
                            </button-base>
                        </div>
                    </div>
                </div>
                
                <div class="col-6 col-12@xs mt-30@xs">
                    <div class="Block Block--pineapple">
                        <div class="Block_container p-30">
                            <p class="ft-title-l-bold color-pineapple ft-title-l-bold@xs">
                                Continuer à venir !
                            </p>
                            
                            <p class="mt-10">
                                Ce qui fait antiswipe, c'est avant tout sa communauté. On espère que tu continueras à en faire partie, tant que ça te plaira.
                            </p>

                            <button-base class="mt-20" :modifiers="['s', 'pineapple']" tag="a" target="_blank" link="https://www.meetup.com/fr-FR/antiswipe-lgbt">
                                Nos événements
                            </button-base>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { debounce } from 'throttle-debounce';

export default {
    name: 'JoinUsPage',
    async fetch () {
        await this.$store.dispatch('reactions/fetch', {
            query: { target: 'asso' }
        })
    },
    data: () => ({
        hearts: 0,
        savedHearts: 0,
        debounce: () => ({})
    }),
    mounted () {
        this.$data.hearts = this.$store.getters['reactions/getCount']('asso')
        this.$data.savedHearts = this.$data.hearts

        this.$data.debounce = debounce(1500, false, () => {
            if (this.$data.hearts != this.$data.savedHearts) {
                this.$store.dispatch('reactions/create', {
                    params: {
                        target: 'asso',
                        type: 'love',
                        count: this.$data.hearts - this.$data.savedHearts,
                        owner: this.$store.state.user.info.id
                    }
                })
            }

            this.$data.savedHearts = this.$data.hearts
        })
    },
    methods: {
        addLove() {
            this.$data.hearts += 1

            this.$data.debounce()
        }
    }
}
</script>