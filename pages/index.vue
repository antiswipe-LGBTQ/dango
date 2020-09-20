<template>
    <div class="HomePage">
        <section class="HomePage_heading">
            <div class="Wrapper">
                <div class="row height-100">
                    <div class="col-6 d-flex fx-dir-column fx-justify-center">
                        <h1 class="HomePage_mainTitle ft-title-2xl">
                            l'humain au coeur
                            <span class="ft-title-3xl ft-bold d-block n-mt-10">de la rencontre lgbtq+</span>
                        </h1>

                        <p class="mv-30 ft-l max-width-s">Des rencontres en réel, dans une ambiance conviviale et des lieux originaux.</p>

                        <div>
                            <button-base>
                                Découvrir nos événements
                            </button-base>
                        </div>
                    </div>
                    <div class="col-6 p-relative">
                        <testimony-cards class="HomePage_testimonies" />
                    </div>
                </div>
            </div>
        </section>
        
        <values-slider />
        
        <images-slider />

        <section class="HomePage_events">
            <div class="Wrapper pv-60">
                <slider-simple>
                    <template slot="header">
                        <h2 class="ft-title-2xl color-blueberry">
                            <b>Nos événements</b>
                        </h2>

                        <p class="color-blueberry ft-s mt-3"><i class="fal fa-map-marker-alt"></i> Région parisienne</p>
                    </template>

                    <event-block
                        class="width-event"
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

        <section class="pv-150">
        </section>
    </div>
</template>

<script>
    import moment from 'moment'

    import TestimonyCards from '@/components/partials/testimony-cards'
    import SliderSimple from '@/components/interactive/SliderSimple'
    import EventBlock from '@/components/events/EventBlock.vue'
    import ValuesSlider from '@/components/partials/values-slider'
    import ImagesSlider from '@/components/partials/home/images-slider'
    import FaqSection from '@/components/partials/home/faq-section'
    import FollowSection from '@/components/partials/home/follow-section'
    import AboutSection from '@/components/partials/home/about-section'

    export default {
        name: 'Homepage',
        components: { TestimonyCards, SliderSimple, EventBlock, ValuesSlider, ImagesSlider, FaqSection, FollowSection, AboutSection },
        async fetch () {
            await this.$store.dispatch('events/fetch')
        },
        data: () => ({

        }),
        computed: {
            events () {
                return Object.values(this.$store.state.events.items).sort((a, b) => {
                    return moment(b.date).diff(moment(a.date))
                })
            }
        },
        mounted () {
            setTimeout(() => {

                if (window.FB && window.FB.CustomerChat) {
                    window.FB.CustomerChat.showDialog()
                } else {
                    console.warn('not found')
                }
            }, 5000)
        }
    }
</script>