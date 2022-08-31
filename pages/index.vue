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


        <section class="HomePage_events p-relative">
            <div id="events" class="anchor"></div>

            <div class="Wrapper Wrapper--xs pv-60">
                <div class="d-flex">
                    <div class="HomePage_city" :class="{ 'is-active': city.value == currentCity }" v-for="city in CITIES" :style="{ backgroundImage: `url(${city.image})` }" @click="currentCity = city.value" :key="city.value">
                        <span><i class="fal fa-map-marker-alt mr-5" v-if="city.value == currentCity"></i> {{ city.label }}</span>
                    </div>

                    <div class="HomePage_city is-add">
                        <span>Ta ville ?</span>
                    </div>
                </div>

                <div class="row-s" v-if="shownEvents.length > 0">
                    <div class="col-4 col-6@s col-12@xs mt-20" v-for="event in shownEvents" :key="event.id">
                        <event-block
                            class="HomePage_event"
                            v-bind="event"
                        />
                    </div>
                </div>
                <div class="text-center b mt-10 br-s p-20" v-else>
                    <p class="ft-title-l color-cherry">Mince, pas d'événements prévus à {{ CITIES.find(c => c.value == currentCity).label }}.</p>

                    <p class="mt-10"><b>Et si tu nous aidais à organiser le prochain ?</b></p>

                    <link-base :modifiers="['cherry']">Organiser un événement</link-base>
                </div>

                <div class="text-center mt-30">
                    <h2 class="ft-title-2xl color-blueberry mb-20 max-width-m m-auto">
                        <b>Annonce des nouveaux événements tous les mardis soir.</b>
                    </h2>

                    <p v-if="countdown">{{ countdown }}</p>
                    <p v-if="nextTuesday">{{ nextTuesday.format('DD MMMM YYYY')}}</p>

                    <p class="max-width-m m-auto">Reçois directement les nouveaux événements dans ta boîte mail pour ne rien rater :</p>

                    <div class="d-flex mt-30 max-width-m m-auto">
                        <input-base placeholder="Entre ton adresse e-mail" :value="formData.email" />

                        <button-base class="ml-5" :modifiers="['s', 'blueberry']">Je m'inscris</button-base>
                    </div>
                </div>
            </div>
        </section>
        
        <images-slider />

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
import moment from 'moment'
import LinkBase from '~/components/base/LinkBase.vue'

const CITIES = [
    { id: 0, label: 'Paris', value: 'paris', image: 'https://www.paris.fr/images/meta/parisfr.jpg' },
    { id: 1, label: 'Lille', value: 'lille', image: 'https://www.okvoyage.com/wp-content/uploads/2009/12/la-grand-place-de-lille.jpg' },
]

export default {
    name: 'Homepage',
    components: { TestimonyCards, SliderSimple, EventBlock, ValuesSlider, ImagesSlider, FaqSection, FollowSection, AboutSection, ThanksSection, LinkBase },
    async fetch () {
        await this.$store.dispatch('events/fetch', {
            query: { $orStatus: 'announced,published' }
        })
    },
    data: () => ({
        CITIES,
        currentCity: 'paris',
        currentMonth: null,
        countdown: '',
        nextTuesday: null,
        formData: {
            email: ''
        }
    }),
    mounted () {
        // this.nextTuesday = moment().isoWeekday() <= 2 ? moment().isoWeekday(2) :  moment().add(1, 'weeks').isoWeekday(2)

        // setInterval(() => {
        //     let duration = moment.duration(this.nextTuesday - moment())
        //     this.countdown = `${duration.days()}j ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s` 
        // }, 500)
    },
    computed: {
        events () {
            return sortDate(this.$store.getters['events/find']({
                city: this.currentCity
            }), 'startDate', true)
        },
        shownEvents () {
            return this.events.filter(e => this.$moment(e.startDate).isAfter(this.$moment()))
        }
    }
}
</script>

<style lang="scss" scoped>
.HomePage_city {
    width: 140px;
    height: 75px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font: var(--ft-title-l);
    // text-transform: uppercase;
    color: var(--color-white);
    border-radius: 6px;
    padding-bottom: 4px;
    background-color: var(--color-blueberry-xweak);
    background-size: cover;
    position: relative;
    overflow: hidden;

    & + & {
        margin-left: 5px;
    }

    span {
        position: relative;
    }

    &::before {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: var(--color-blueberry-xweak);
        opacity: 0.75;
        transition: all 150ms ease;
    }

    &.is-active {

        &::before {
            background-color: black;
            opacity: 0.5;
        }
    }

    &:hover {
        
        &::before {
            background-color: black;
            opacity: 0.5;
        }
    }

    &.is-add {

        &::before {
            opacity: 1;
        }

        &:hover {

            &::before {
                opacity: 1;
                background-color: var(--color-blueberry-weak);
            }
        }
    }
}
</style>