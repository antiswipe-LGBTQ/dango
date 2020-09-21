<template>
    <div class="ScrollerText" :class="{ ...$modifiers }" :style="{ '--item-count': items.length, '--speed': speed + 'ms' }">
        <div class="ScrollerText_rail">
            <div 
                v-for="(item, i) in items"
                class="ScrollerText_item"
                :key="i"
            >
                {{ item }}
            </div>

            <div 
                v-for="(item, i) in items"
                class="ScrollerText_item"
                :key="i"
            >
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script>
import modifiers from '@/plugins/modifiers'

export default {
    name: 'ScrollerText',
    mixins: [ modifiers ],
    props: {
        items: { type: Array, default: () => [] },
        speed: { type: Number, default: 1000 }
    },
    data: () => ({
        state: {
            scrolling: true
        }
    })
}
</script>