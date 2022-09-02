<template>
    <div class="HomePage">
        <section class="HomePage_heading">
            <div class="Wrapper">
                <div class="row height-100">
                    <div class="HomePage_titles col-6 d-flex fx-dir-column fx-justify-center col-12@xs">
                        <h1 class="HomePage_mainTitle ft-title-3xl ft-title-2xl@s">
                            Allez viens, on se rencontre
                            <span class="HomePage_mainTitleBold color-cherry d-block n-mt-10 mt-3@s">
                                <b>sans filtres.</b>
                            </span>
                        </h1>

                        <p class="mv-30 ft-l max-width-m ft-m@s">Nous créons des événements où il est plus simple de rencontrer. Hors des applications qui nous filtrent, loin des boîtes où l'on ne s'entend pas.</p>

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
                <div class="d-flex d-none@xs">
                    <div class="HomePage_city" :class="{ 'is-active': city.value == CITIES[currentCity].value }" v-for="city in CITIES" :style="{ backgroundImage: `url(${city.image})` }" @click="currentCity = city.id" :key="city.value">
                        <div class="d-flex fxa-center">
                            <i class="fal fa-map-marker-alt mr-10" v-if="city.value == CITIES[currentCity].value"></i> 
                            <div>
                                <div>{{ city.label }}</div>
                                <div class="ft-s">18 à 35 ans</div>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="HomePage_city is-add">
                        <div>Ta ville ?</div>
                    </div> -->
                </div>

                <select-base
                    label="Ville"
                    :value="currentCity"
                    @input="onCityChange"
                    :options="CITIES"
                    :multiple="false"
                    class="d-none d-flex@s"
                />

                <div v-if="shownEvents.length > 0">
                    <div class="row-s">
                        <div class="col-4 col-6@s col-12@xs mt-20 mt-10@s" v-for="event in shownEvents.slice(0, 6)" :key="event.id">
                            <event-block
                                class="HomePage_event"
                                v-bind="event"
                            />
                        </div>
                    </div>

                    <div class="text-center mt-30" v-if="shownEvents.length > 6">
                        <button-base :modifiers="['s', 'blueberry']" icon-before="long-arrow-right" :to="{ name: 'events' }">Voir tous les événements</button-base>
                    </div>
                </div>
                <div class="text-center b mt-10 br-s p-20" v-else>
                    <p class="ft-title-l color-cherry">Mince, pas d'événements prévus à {{ CITIES.find(c => c.value == CITIES[currentCity].value).label }}.</p>

                    <!-- <p class="mt-10"><b>Et si tu nous aidais à organiser le prochain ?</b></p>

                    <link-base :modifiers="['cherry']">Organiser un événement</link-base> -->
                </div>

                <div class="text-center mt-40">
                    <h2 class="ft-title-2xl color-blueberry mb-20 max-width-m m-auto">
                        <b>Annonce des nouveaux événements tous les mardis soir.</b>
                    </h2>

                    <p v-if="countdown">{{ countdown }}</p>
                    <p v-if="nextTuesday">{{ nextTuesday.format('DD MMMM YYYY')}}</p>

                    <p class="max-width-m m-auto">Reçois directement les nouveaux événements dans ta boîte mail pour ne rien rater :</p>

                    <form @submit.prevent="onNewsletter" class="mt-30 max-width-m m-auto">
                        <div class="d-flex">
                            <input-base placeholder="Entre ton adresse e-mail" v-model="formData.email" type="emails" required />

                            <button-base class="ml-5" :modifiers="['s', 'blueberry']" :loading="isLoading" :disabled="formData.cities.length <= 0">Je m'inscris</button-base>
                        </div>
                        <div class="mt-5 ft-m-medium d-flex">
                            <label class="d-flex fxa-center">
                                <input type="checkbox" class="mr-5" @input="toggleCity('paris')" :checked="formData.cities.includes('paris')">
                                Paris
                            </label>

                            <label class="d-flex fxa-center ml-10">
                                <input type="checkbox" class="mr-5" @input="toggleCity('lille')" :checked="formData.cities.includes('lille')">
                                Lille
                            </label>
                        </div>

                        <div class="text-left" v-if="formData.cities.length <= 0">Sélectionne au moins une ville !</div>
                    </form>

                    <div class="mt-10 max-width-m m-auto text-left" v-if="error">{{ error }}</div>
                    <div class="mt-10 max-width-m m-auto text-left" v-else-if="success">Tu es abonné·e à nos news, merci ! On se voit dans la prochaine newsletter.</div>
                </div>
            </div>
        </section>
        
        <images-slider />

        <follow-section />

        <values-slider />

        <!-- <faq-section /> -->

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

import { SelectBase } from 'instant-coffee-core'

import { sortDate } from '@/utils/base-utils'
import moment from 'moment'
import LinkBase from '~/components/base/LinkBase.vue'

const CITIES = [
    { id: 0, label: 'Paris', value: 'paris', image: 'https://www.paris.fr/images/meta/parisfr.jpg' },
    { id: 1, label: 'Lille', value: 'lille', image: 'https://www.okvoyage.com/wp-content/uploads/2009/12/la-grand-place-de-lille.jpg' },
]

export default {
    name: 'Homepage',
    components: { SelectBase, TestimonyCards, SliderSimple, EventBlock, ValuesSlider, ImagesSlider, FaqSection, FollowSection, AboutSection, ThanksSection, LinkBase },
    async fetch () {
        await this.$store.dispatch('events/fetch', {
            query: { $orStatus: 'announced,published' }
        })
    },
    data: () => ({
        CITIES,
        isLoading: false,
        error: '',
        success: false,
        currentCity: 0,
        currentMonth: null,
        countdown: '',
        nextTuesday: null,
        formData: {
            email: '',
            cities: ['paris']
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
                city: CITIES[this.currentCity].value
            }), 'startDate', true)
        },
        shownEvents () {
            return this.events.filter(e => this.$moment(e.startDate).isAfter(this.$moment()))
        }
    },
    methods: {
        onCityChange (v) {
            this.currentCity = v
        },
        toggleCity (v) {
            if (this.formData.cities.includes(v)) {
                this.formData.cities = this.formData.cities.filter(c => c != v)
            } else {
                this.formData.cities = [ ...this.formData.cities, v ]
            }
        },
        async onNewsletter () {
            if (this.isLoading) return 

            this.success = false
            this.error = ''
            this.isLoading = true 

            try {
                const token = await this.$recaptcha.execute('login')
                const response = await this.$axios.$post('/user/newsletter', {
                    ...this.formData, token
                })

                if (response.status !== 1) {
                    throw Error('NOOO')
                }
                
                this.success = true
                this.formData.email = ''
            } catch (e) {
                console.error(e)
                this.error = 'Une erreur est survenue, vérifie ton adresse email ou réessaye plus tard :('
            }

            this.isLoading = false 
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

    & > div {
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
        text-align: left;

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