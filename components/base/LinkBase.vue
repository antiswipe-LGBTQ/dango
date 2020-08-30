<template>
    <component :is="link ? 'a' : 'div'" class="LinkBase" :target="target" :href="link" :class="{ ...$modifiers }" @click="$emit('click')">
        <div class="LinkBase_content">
            <slot></slot>

            <i class="fal" :class="[`fa-${fa}`]" v-if="fa"></i>
        </div>
    </component>
</template>

<script>
import modifiers from '@/plugins/modifiers'

export default {
    name: 'LinkBase',
    mixins: [ modifiers ],
    props: { 
        modifiers: { type: Array, default: () => [] },
        fa: { type: [ String, Boolean ], default: false },
        target: { type: String, defaut: '_self' },
        link: { type: [ String, Boolean ], default: false }
    }
}
</script>