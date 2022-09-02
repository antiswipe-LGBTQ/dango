<template>
    <component :is="componentTag" class="ButtonBase"
        :class="[ $modifiers, (node ? node.attrs.class : []), { 'is-loading': loading, 'is-disabled': disabled, 'is-image': image || numberBefore, 'is-no-text': !text, 'can-delete': canDelete } ]" :to="localePath(to)"
        :disabled="disabled || loading"
        :replace="replace"
        v-bind="computedAttrs"
        v-on="$listeners"
    >
        <div class="G_cosmoz"></div>

        <div class="ButtonBase_content">
            <span class="ButtonBase_image" :style="{ backgroundImage: `url(${image})` }" v-if="image"></span>

            <span class="ButtonBase_numberBefore" v-if="numberBefore">
                {{ numberBefore > 99 ? '+99' : numberBefore }}
            </span>

            <span class="ButtonBase_iconBefore" v-if="iconBefore">
                <i class="fal" :class="[`fa-${iconBefore}`]"></i>
            </span>

            <span class="ButtonBase_iconBefore ButtonBase_emoji" v-if="emojiBefore">
                {{ emojiBefore }}
            </span>

            <span class="ButtonBase_before" v-if="$slots.before">
                <slot name="before"></slot>
            </span>

            <span class="ButtonBase_text" v-if="text || subtitle || ($slots.default && $slots.default !== '')">
                {{ text ? $ellipsis(text, ellipsis) : '' }}

                <slot></slot>

                <div class="ButtonBase_subtitle" v-if="subtitle">{{ subtitle }}</div>
            </span>

            <span class="ButtonBase_notification" v-if="notification"></span>
            
            <span class="ButtonBase_after" v-if="$slots.after">
                <slot name="after"></slot>
            </span>

            <span class="ButtonBase_iconAfter" v-if="iconAfter">
                <i class="fal" :class="[`fa-${iconAfter}`]"></i>
            </span>
            <span class="ButtonBase_iconAfter ButtonBase_emoji" v-if="emojiAfter">
                {{ emojiAfter }}
            </span>
        </div>

        <ripples class="ButtonBase_ripples" v-show="!disabled" />

        <div class="ButtonBase_iconLoading">
            <i class="fal" :class="[`fa-${iconLoading}`]"></i>
        </div>

        <span class="ButtonBase_delete" @click.stop.capture="$emit('delete')" v-if="canDelete">
            <fa icon="far fa-times" />
        </span>
    </component>
</template>

<script>
import ModifiersMixin from '@/plugins/modifiers'

export default {
    name: 'ButtonBase',
    mixins: [ ModifiersMixin ],
    props: {
        tag: { type: String },
        href: { type: String },
        link: { type: String },
        numberBefore: { type: Number, default: 0 },
        text: { type: [String, Number], default: '' },
        subtitle: { type: String },
        image: { type: String },
        ellipsis: { type: Number, default: 999 },
        notification: { type: Boolean },
        canDelete: { type: Boolean },
        disabled: { type: Boolean, default: false },
        to: { type: [Object, Boolean], default: false },
        node: { type: Object, default: () => {} },
        emojiBefore: { type: String, default: '' },
        emojiAfter: { type: String, default: '' },
        iconBefore: { type: String, default: '' },
        iconAfter: { type: String, default: '' },
        loading: { type: Boolean, default: false },
        replace: { type: Boolean, default: false },
        iconLoading: { type: String, default: 'spinner-third' },
        attrs: { type: Object, default: () => ({}) }
    },
    computed: {
        componentTag () {
            if (this.tag) return this.tag

            if (this.link || this.href) return 'a'
            if (this.to) return 'nuxt-link'

            return 'button'
        },
        computedAttrs () {
            return {
                href: this.$props.link ? this.$props.link : this.$props.href,
                ...this.$props.attrs,
                ...(this.$props.node ? this.$props.node.attrs : {})
            }
        }
    }
}
</script>