<template>
    <div class="mt-60">
        <section class="p-relative">
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
                    <div class="mt-30" v-for="(month, id) in eventsByMonth" :key="id">
                        <p class="ft-title-xl mb-20">
                            {{ $moment(month.$groupData.startDate).format('MMMM YYYY') }}
                        </p>

                        <div class="row-s">
                            <div class="col-4 col-6@s col-12@xs mb-20 mb-10@s" v-for="event in month.items" :key="event.id">
                                <event-block
                                    class="HomePage_event"
                                    v-bind="event"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center b mt-10 br-s p-20" v-else>
                    <p class="ft-title-l color-cherry">Mince, pas d'événements prévus à {{ CITIES.find(c => c.value == CITIES[currentCity].value).label }}.</p>

                    <!-- <p class="mt-10"><b>Et si tu nous aidais à organiser le prochain ?</b></p>

                    <link-base :modifiers="['cherry']">Organiser un événement</link-base> -->
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import EventBlock from '@/components/events/EventBlock.vue'
import { SelectBase } from 'instant-coffee-core'

import { sortDate, groupBy } from '@/utils/base-utils'
import LinkBase from '~/components/base/LinkBase.vue'

const CITIES = [
    { id: 0, label: 'Paris', value: 'paris', image: 'https://www.paris.fr/images/meta/parisfr.jpg' },
    { id: 1, label: 'Lille', value: 'lille', image: 'https://www.okvoyage.com/wp-content/uploads/2009/12/la-grand-place-de-lille.jpg' },
]

export default {
    name: 'Homepage',
    components: { SelectBase, EventBlock, LinkBase },
    async fetch () {
        await this.$store.dispatch('events/fetch', {
            query: { $orStatus: 'announced,published' }
        })
    },
    data: () => ({
        CITIES,
        currentCity: 0
    }),
    computed: {
        events () {
            return sortDate(this.$store.getters['events/find']({
                city: CITIES[this.currentCity].value
            }), 'startDate', true)
        },
        shownEvents () {
            return this.events.filter(e => this.$moment(e.startDate).isAfter(this.$moment()))
        },
        eventsByMonth () {
            return groupBy(this.events, { 'startDate': '$month' }, {

            })
        }
    },
    methods: {
        onCityChange (v) {
            this.currentCity = v
        },
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