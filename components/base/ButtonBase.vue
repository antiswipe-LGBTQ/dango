<template>
    <component :is="link ? 'a' : 'div'" class="ButtonBase" :target="target" :href="link" :class="{ ...$modifiers }" @click="$emit('click')">
        <div class="ButtonBase_content">
            <slot></slot>

            <i class="fal" :class="[`fa-${fa}`]" v-if="fa"></i>
        </div>
    </component>
</template>

<script>
import modifiers from '@/plugins/modifiers'

export default {
    name: 'ButtonBase',
    mixins: [ modifiers ],
    props: { 
        fa: { type: [ String, Boolean ], default: false },
        target: { type: String, defaut: '_self' },
        link: { type: [ String, Boolean ], default: false }
    }
}
</script>