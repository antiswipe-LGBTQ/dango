<template>
    <div>
        {{ displayText }} 
        <link-base @click="state.full = true" v-show="!state.full">Lire la suite</link-base>
        <link-base @click="state.full = false" v-show="state.full">Voir moins</link-base>
    </div>
</template>

<script>
export default {
    name: 'TruncatedText',
    props: {
        text: { type: String, default: '' },
        max: { type: Number, default: 100 }
    },
    data: () => ({
        state: {
            full: false
        }
    }),
    computed: {
        displayText () {
            let str = this.$props.text

            if (str.length <= this.$props.max || this.$data.state.full) return str
            return str.substr(0, str.lastIndexOf(' ', this.$props.max))
        }
    }
}
</script>