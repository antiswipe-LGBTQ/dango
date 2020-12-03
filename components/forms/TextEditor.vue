<template>
    <div class="TextEditor">
        <div class="TextBody" v-html="value" v-if="!editor"></div>
        <editor-content class="TextEditor_content TextBody" :editor="editor" ref="text" v-if="editor" />
    </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { Heading, Bold, Blockquote, Image, History, Italic, OrderedList, BulletList, ListItem } from 'tiptap-extensions'
import Link from '@/plugins/tiptap/Link'

export default {
    name: 'TextEditor',
    components: { EditorContent, EditorMenuBar },
    props: {
        value: { type: String, default: '' },
        editable: { type: Boolean, default: false }
    },
    data: () => ({
        editor: null
    }),
    async mounted () {
        this.$data.editor = new Editor({
            editable: this.$props.editable,
            extensions: [
                new Heading({ levels: [1, 2, 3] }),
                new Bold(), new Italic(),
                new OrderedList(), new BulletList(), new ListItem(),
                new Blockquote(),
                new Image(),
                new History(),
                new Link(), new StyledBlock()
            ],
            content: this.$props.value,
        })

        this.$data.editor.on('update', () => this.onUpdate())
        setTimeout(() => this.onUpdate(), 100)
    },
    methods: {
        onUpdate () {
            this.$emit('input', this.$data.editor.getHTML())
        }
    }
}
</script>