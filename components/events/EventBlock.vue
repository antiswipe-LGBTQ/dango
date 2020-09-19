<template>
    <div class="EventBlock" :class="{ 'EventBlock--past': isPast }">
        <div class="EventBlock_container">
            <div>
                <div class="EventBlock_image" :style="{ backgroundImage: `url(${images[0]})` }"></div>
                <div class="EventBlock_content">
                    <h3 class="ft-title-l ft-bold">{{ title }}</h3>
                    <p class="ft-s color-ft-weak mt-3"><i class="fal fa-map-marker-alt"></i> {{ location }}</p>

                    <p class="mt-30 mb-20">
                        <b>{{ fullDate }}</b>
                        <span class="ft-s color-ft-weak">({{ offsetDate }})</span>
                    </p>
                </div>
            </div>
            <div class="EventBlock_actions">
                <p>
                    <span class="ft-s color-blueberry" v-if="!isPast && (maxAttending - attending) > 10">
                        {{ attending }} inscrit(e)s
                    </span>
                    <span class="ft-s color-blueberry ft-medium" v-else-if="!isPast && (maxAttending - attending) <= 10 && (maxAttending - attending) > 0">
                        {{ (maxAttending - attending) }} place(s) restantes
                    </span>
                    <span class="ft-s color-blueberry-weak" v-else-if="!isPast && (maxAttending - attending) <= 0">
                        Sur liste d'attente
                    </span>
                    <span class="ft-s color-blueberry" v-else-if="isPast">
                        {{ attending }} personnes ont participé
                    </span>
                </p>

                <button-base :modifiers="date ? ['blueberry', 's', 'no-shadow'] : ['blueberry', 'secondary', 's', 'no-shadow']" :link="link" target="_blank">Plus de détails</button-base>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'EventBlock',
    props: {
        title: { type: String, default: 'Welcome Party #3' },
        images: { type: Array, default: () => [] },
        location: { type: String, default: 'Paris (75010)' },
        attending: { type: Number, default: 0 },
        maxAttending: { type: Number, default: 0 },
        link: { type: String, default: '#' },
        date: { type: Date }
    },
    computed: {
        isPast () {
            return moment(this.$props.date).isBefore(moment())
        },
        fullDate () {
            return moment(this.$props.date).format('dddd Do MMMM')
        },
        offsetDate () {
            return moment(this.$props.date).fromNow()
        }
    }
}
</script>