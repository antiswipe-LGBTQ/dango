<template>
    <div class="ButtonBase" :class="{ ...$modifiers }" @click="$emit('click')">
        <slot></slot>
    </div>
</template>

<script>
import modifiers from '@/plugins/modifiers'

export default {
    name: 'ButtonBase',
    mixins: [ modifiers ],
    props: { 
        modifiers: { type: Array, default: () => [] }
    }
}
</script>