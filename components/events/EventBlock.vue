<template>
    <div class="EventBlock" :class="[ { 'EventBlock--past': isPast, 'EventBlock--placeholder': !title }, `is-${color}`]">
        <div class="EventBlock_main">
            <component :is="status == 'announced' ? 'a' : 'div'" :href="link" target="_blank" class="EventBlock_container" v-if="title">
                <div class="EventBlock_image" :style="{ backgroundImage: `url(${thumbnail})` }"></div>

                <div class="EventBlock_content">
                    <h3 class="EventBlock_title ellipsis-2 color-current">
                        {{ shortTitle ? shortTitle : title }}
                    </h3>
                    <p class="ft-title-s color-current-weak mb-5" v-if="status == 'announced'">{{ location }}{{ city ? ` · ${city}` : '' }}</p>
                    <p class="Tag Tag--s" v-else>Annoncé bientôt</p>

                    <!-- <p class="mt-10 mb-10">
                        <b>{{ fullDate }}</b>
                        <span class="ft-xs color-ft-weak">({{ offsetDate }})</span>
                    </p> -->

                    <p class="EventBlock_date ft-m-bold mt-5" v-if="startDate">{{ startDate.format('dddd D MMMM') }}</p>
                </div>
                <!-- <div class="EventBlock_actions">
                    <p>
                        <template v-if="maxAttending !== false && attending !== false">
                            <span class="ft-s color-blueberry" v-if="!isPast && (maxAttending - attending) > 10">
                                {{ attending }} inscrit·e·s
                            </span>
                            <span class="ft-s color-blueberry ft-medium" v-else-if="!isPast && (maxAttending - attending) <= 10 && (maxAttending - attending) > 0">
                                {{ (maxAttending - attending) }} place(s) restantes
                            </span>
                            <span class="ft-s color-blueberry-weak" v-else-if="!isPast && (maxAttending - attending) <= 0">
                                Sur liste d'attente
                            </span>
                            <span class="ft-s color-blueberry" v-else-if="isPast">
                                {{ attending }} participant·e·s
                            </span>
                        </template>
                    </p>

                    <button-base tag="a" :modifiers="isPast ? ['blueberry', 'secondary', 's', 'no-shadow'] : ['blueberry', 's', 'no-shadow']" :link="link" target="_blank">Plus de détails</button-base>
                </div> -->
            
                <!-- <div class="EventBlock_tag" v-if="isNext && status == 'announced'">
                    Prochain
                </div> -->
            </component>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'EventBlock',
    props: {
        title: { type: String, default: '' },
        city: { type: String, default: '' },
        shortTitle: { type: String, default: '' },
        status: { type: String, default: '' },
        color: { type: String, default: 'blueberry' },
        isNext: { type: Boolean, default: false },
        thumbnail: { type: String, default: '' },
        location: { type: String, default: 'Paris (75010)' },
        attending: { type: [Number, Boolean], default: false },
        maxAttending: { type: [Number, Boolean], default: false },
        link: { type: String, default: '#' },
        startDate: { type: Object }
    },
    computed: {
        isPast () {
            return this.$props.startDate ? this.$props.startDate.isBefore(moment()) : false
        },
        fullDate () {
            return this.$props.startDate.format('dddd Do MMM')
        },
        offsetDate () {
            return this.$props.startDate.fromNow()
        },
    }
}
</script>