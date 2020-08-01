<template>
    <div class="EventBlock">
        <div class="EventBlock_container">
            <div class="EventBlock_image" :style="{ backgroundImage: `url(${images[0]})` }"></div>
            <div class="EventBlock_content">
                <h3 class="ft-title-l ft-bold">{{ title }}</h3>
                <p class="ft-s color-ft-weak mt-3"><i class="fal fa-map-marker-alt"></i> {{ location }}</p>
                <p class="mt-10">{{ excerpt }}</p>
            </div>
            <div class="EventBlock_actions">
                <button-base :modifiers="['blueberry', 's']" :link="link" target="_blank">Plus de détails</button-base>
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
        excerpt: { type: String, default: 'Rejoins-nous pour fêter la fin de ce confinement ! Au programme...'},
        link: { type: String, default: '#' }
    }
}
</script>