<template>
    <div class="EventBlock" :class="{ 'EventBlock--past': !date }">
        <div class="EventBlock_container">
            <div class="EventBlock_image" :style="{ backgroundImage: `url(${images[0]})` }"></div>
            <div class="EventBlock_content">
                <h3 class="ft-title-l ft-bold">{{ title }}</h3>
                <p class="ft-s color-ft-weak mt-3"><i class="fal fa-map-marker-alt"></i> {{ location }}</p>

                <p class="mt-30 mb-20">
                    <template v-if="date">
                        <b>Samedi 21 septembre</b>
                        <span class="ft-s color-ft-weak">(dans 3 jours)</span>
                    </template>
                    <template v-else>
                        <b>Evénément passé</b>
                        <span class="ft-s color-ft-weak">(il y a 6 jours)</span>
                    </template>
                </p>
            </div>
            <div class="EventBlock_actions">
                <p>
                    <span class="ft-s color-blueberry" v-if="date && (maxAttending - attending) > 10">
                        {{ attending }} inscrit(e)s
                    </span>
                    <span class="ft-s color-blueberry ft-medium" v-else-if="date && (maxAttending - attending) <= 10 && (maxAttending - attending) > 0">
                        {{ (maxAttending - attending) }} place(s) restantes
                    </span>
                    <span class="ft-s color-blueberry-weak" v-else-if="date && (maxAttending - attending) <= 0">
                        Sur liste d'attente
                    </span>
                </p>

                <button-base :modifiers="date ? ['blueberry', 's', 'no-shadow'] : ['blueberry', 'secondary', 's', 'no-shadow']" :link="link" target="_blank">Plus de détails</button-base>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EventBlock',
    props: {
        title: { type: String, default: 'Welcome Party #3' },
        images: { type: Array, default: () => [] },
        location: { type: String, default: 'Paris (75010)' },
        attending: { type: Number, default: 0 },
        maxAttending: { type: Number, default: 0 },
        link: { type: String, default: '#' },
        date: { type: [Date, Boolean] }
    }
}
</script>