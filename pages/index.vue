<template>
    <div class="HomePage">
        <section class="HomePage_heading">
            <div class="Wrapper">
                <div class="row height-100">
                    <div class="HomePage_titles col-6 d-flex fx-dir-column fx-justify-center col-12@xs">
                        <h1 class="HomePage_mainTitle ft-title-3xl color-cherry ft-title-2xl@s">
                            l'humain au cœur
                            <span class="HomePage_mainTitleBold d-block n-mt-10 mt-3@s">
                                <b>de la rencontre lgbtq+</b>
                            </span>
                        </h1>

                        <p class="mv-30 ft-l max-width-s ft-m@s">Des rencontres en réel, dans une ambiance conviviale et des lieux originaux. <b>Pas d'appli, pas de filtres, pas de swipe.</b></p>

                        <div>
                            <button-base tag="a" link="#events">
                                Découvrir nos événements
                            </button-base>
                        </div>
                    </div>
                    <div class="col-6 p-relative d-none@xs">
                        <testimony-cards class="HomePage_testimonies" />
                    </div>
                </div>
            </div>
        </section>

        <div class="HomePage_activities">
            <div>
                rencontres chill · balades en plein air · quizz & blindtests · escape games · bons restos · randonnées · club lecture · jeux de société · rencontres chill · balades en plein air · quizz & blindtests · escape games · bons restos · randonnées · club lecture · jeux de société · rencontres chill · balades en plein air · quizz & blindtests · escape games · bons restos · randonnées · club lecture · jeux de société · rencontres chill · balades en plein air · quizz & blindtests · escape games · bons restos · randonnées · club lecture · jeux de société · rencontres chill · balades en plein air · quizz & blindtests · escape games · bons restos · randonnées · club lecture · jeux de société · rencontres chill · balades en plein air · quizz & blindtests · escape games · bons restos · randonnées · club lecture · jeux de société ·
            </div>
        </div>

        <images-slider />

        <section class="HomePage_events p-relative">
            <div id="events" class="anchor"></div>

            <div class="Wrapper Wrapper--xs pv-60" v-if="currentMonth">
                <div class="fx-center text-center">
                    <link-base :modifiers="['blueberry']" @click="onPrev">Précédent</link-base>

                    <h2 class="ft-title-4xl color-blueberry ft-title-2xl@s">
                        <b>{{ $moment(currentMonth, 'YYYYMM').format('MMMM YYYY') }}</b>
                    </h2>

                    <link-base :modifiers="['blueberry']" @click="onNext">Suivant</link-base>
                </div>
                    
                <div class="row-s">
                    <div class="col-4 col-6@s col-12@xs mt-20" v-for="event in shownEvents" :key="event.id">
                        <event-block
                            class="HomePage_event"
                            v-bind="event"
                            :is-next="event._id == nextEvent._id"
                        />
                    </div>
                    <div class="col-4 col-6@s col-12@xs mt-20 d-none@m" v-for="placeholder in placeholders" :key="placeholder">
                        <event-block
                            class="HomePage_event"
                        />
                    </div>
                </div>

                <div class="text-center mt-40">
                    <h2 class="ft-title-3xl color-blueberry mb-20 ft-title-2xl@xs">
                        <b>Reste à l'écoute !</b>
                    </h2>

                    <p class="max-width-m m-auto">Nous avons toujours des événements en préparation pour tous les goûts, et de belles surprises ! Sois toujours informé·e en nous suivant sur nos réseaux :</p>

                    <div class="mt-30">
                        <button-base class="d-block@xs" tag="a" link="https://www.meetup.com/fr-FR/antiswipe-lgbt" :modifiers="['blueberry']" target="_blank">Rejoindre le groupe Meetup</button-base>
                        <button-base class="ml-5 d-block@xs mt-10@xs ml-0@xs" tag="a" target="_blank" :modifiers="['secondary', 's', 'blueberry']" link="https://www.instagram.com/antiswipe.lgbt/">Nous suivre sur Instagram</button-base>
                    </div>
                </div>
            </div>
        </section>
        
        <follow-section />

        <values-slider />


        <faq-section />

        <about-section />

        <thanks-section />
    </div>
</template>

    <script>

    import TestimonyCards from '@/components/partials/testimony-cards'
    import SliderSimple from '@/components/interactive/SliderSimple'
    import EventBlock from '@/components/events/EventBlock.vue'
    import ValuesSlider from '@/components/partials/values-slider'
    import ImagesSlider from '@/components/partials/home/images-slider'
    import FaqSection from '@/components/partials/home/faq-section'
    import FollowSection from '@/components/partials/home/follow-section'
    import AboutSection from '@/components/partials/home/about-section'
    import ThanksSection from '@/components/partials/home/thanks-section'

    import { sortDate } from '@/utils/base-utils'

    export default {
        name: 'Homepage',
        components: { TestimonyCards, SliderSimple, EventBlock, ValuesSlider, ImagesSlider, FaqSection, FollowSection, AboutSection, ThanksSection },
        async fetch () {
            await this.$store.dispatch('events/fetch', {
                query: { $orStatus: 'announced,published' }
            })
        },
        data: () => ({
            currentMonth: null
        }),
        mounted () {
            let maxFutureMonths = 3
            let showEvents = false
            let increment = 0

            while (!showEvents && maxFutureMonths > 0) {
                this.currentMonth = this.$moment().add(increment, 'months').format('YYYYMM')

                let eventsLeft = this.events.filter(e => e.startDate.format('YYYYMM') == this.currentMonth && e.startDate.isAfter(this.$moment()))

                if (eventsLeft.length > 0) showEvents = true

                increment++
                maxFutureMonths--
            }

            if (!showEvents) this.currentMonth = this.$moment().format('YYYYMM')
        },
        computed: {
            events () {
                return sortDate(this.$store.getters['events/find'](), 'startDate', true)
            },
            shownEvents () {
                return this.events.filter(e => this.$moment(e.startDate).format('YYYYMM') == this.currentMonth)
            },
            futureEvents () {
                return this.events.filter(e => this.$moment(e.startDate).isAfter(this.$moment()))
            },
            nextEvent () {
                return this.futureEvents[0] ? this.futureEvents[0] : null
            },
            placeholders () {
                let number = 0

                if (this.shownEvents.length < 6) {
                    number = 6 - this.shownEvents.length
                }

                return number
            }
        },
        methods: {
            onPrev () {
                this.currentMonth = this.$moment(this.currentMonth, 'YYYYMM').subtract(1, 'months').format('YYYYMM')
            },
            onNext () {
                this.currentMonth = this.$moment(this.currentMonth, 'YYYYMM').add(1, 'months').format('YYYYMM')
            }
        }
    }
</script>