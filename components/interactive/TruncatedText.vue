<template>
    <div>
        <span v-html="displayText"></span>

        <link-base :modifiers="modifiers" @click="state.full = true" v-show="!state.full && !state.short">Lire la suite</link-base>
        <link-base :modifiers="modifiers" @click="state.full = false" v-show="state.full && !state.short">Voir moins</link-base>
    </div>
</template>

<script>
export default {
    name: 'TruncatedText',
    props: {
        modifiers: { type: Array, default: () => [] },
        text: { type: String, default: '' },
        max: { type: Number, default: 100 }
    },
    data: () => ({
        state: {
            full: false,
            short: false
        }
    }),
    computed: {
        displayText () {
            let str = this.$props.text

            if (!str) return ''

            if (str.length <= this.$props.max || this.$data.state.full) {
                if (str.length <= this.$props.max) this.$data.state.short = true
                return str
            }

            return str.substr(0, str.lastIndexOf(' ', this.$props.max)) + '...'
        }
    },
    methods: {
        collapse () {
            this.$data.state.full = false
        }
    }
}
</script>