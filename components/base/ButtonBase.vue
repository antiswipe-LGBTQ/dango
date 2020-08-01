<template>
    <a class="ButtonBase" :target="target" :href="link" :class="{ ...$modifiers }" @click.prevent="$emit('click')">
        <slot></slot>

        <i class="fal" :class="[`fa-${fa}`]" v-if="fa"></i>
    </a>
</template>

<script>
import modifiers from '@/plugins/modifiers'

export default {
    name: 'ButtonBase',
    mixins: [ modifiers ],
    props: { 
        modifiers: { type: Array, default: () => [] },
        fa: { type: [ String, Boolean ], default: false },
        target: { type: String, defaut: '_self' },
        link: { type: String, default: '#' }
    }
}
</script>