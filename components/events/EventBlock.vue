<template>
    <div class="EventBlock" :class="{ 'EventBlock--past': isPast }">
        <div class="EventBlock_container">
            <div class="EventBlock_image" :style="{ backgroundImage: `url(${thumbnail})` }"></div>
            <div class="EventBlock_content">
                <div>
                    <h3 class="ft-title-l ft-title-m@s">
                        <b>{{ title }}</b>
                    </h3>
                    <p class="ft-s color-ft-weak mt-3 d-none@s"><i class="fal fa-map-marker-alt"></i> {{ location }}</p>
                </div>

                <p class="mt-10 mb-10">
                    <b>{{ fullDate }}</b>
                    <span class="ft-xs color-ft-weak">({{ offsetDate }})</span>
                </p>
            </div>
            <div class="EventBlock_actions">
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
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'EventBlock',
    props: {
        title: { type: String, default: '' },
        thumbnail: { type: String, default: '' },
        location: { type: String, default: 'Paris (75010)' },
        attending: { type: [Number, Boolean], default: false },
        maxAttending: { type: [Number, Boolean], default: false },
        link: { type: String, default: '#' },
        startDate: { type: Object }
    },
    computed: {
        isPast () {
            return this.$props.startDate.isBefore(moment())
        },
        fullDate () {
            return this.$props.startDate.format('dddd Do MMM')
        },
        offsetDate () {
            return this.$props.startDate.fromNow()
        }
    }
}
</script>