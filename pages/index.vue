<template>
    <div class="HomePage" @click="$store.dispatch('events/fetch', {})">
        <section class="HomePage_heading">
            <div class="Wrapper">
                <div class="row height-100">
                    <div class="HomePage_titles col-6 d-flex fx-dir-column fx-justify-center col-12@xs">
                        <h1 class="HomePage_mainTitle ft-title-2xl ft-title-l@s">
                            l'humain au cœur
                            <span class="HomePage_mainTitleBold ft-title-3xl d-block n-mt-10 ft-title-2xl@s mt-3@s">
                                <b>de la rencontre lgbtq+</b>
                            </span>
                        </h1>

                        <p class="mv-30 ft-l max-width-s ft-m@s">Des rencontres en réel, dans une ambiance conviviale et des lieux originaux. <b>Pas d'appli, pas de filtres, pas de swipe.</b></p>

                        <div>
                            <button-base link="#events">
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
        
        <values-slider />
        
        <images-slider />

        <section class="HomePage_events p-relative">
            <div id="events" class="anchor"></div>

            <div class="Wrapper pv-60">
                <slider-simple class="outflow@s">
                    <template slot="header">
                        <div class="width-100@s reflow@s">
                            <h2 class="ft-title-2xl color-blueberry">
                                <b>Nos événements</b>
                            </h2>

                            <p class="color-blueberry ft-s mt-3"><i class="fal fa-map-marker-alt"></i> Région parisienne</p>
                        </div>
                    </template>

                    <event-block
                        class="HomePage_event"
                        v-for="event in events"
                        :key="event.id"
                        v-bind="event"
                    />
                </slider-simple>
            </div>
        </section>

        <follow-section />

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

    import { sortPastFuture } from '@/utils/base-utils'

    export default {
        name: 'Homepage',
        components: { TestimonyCards, SliderSimple, EventBlock, ValuesSlider, ImagesSlider, FaqSection, FollowSection, AboutSection, ThanksSection },
        async fetch () {
            await this.$store.dispatch('events/fetch', {})
        },
        data: () => ({

        }),
        computed: {
            events () {
                return sortPastFuture(this.$store.getters['events/find'](), 'startDate')
            }
        }
    }
</script>