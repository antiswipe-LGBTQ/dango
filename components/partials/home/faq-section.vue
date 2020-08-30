<template>
    <div class="Homepage_faq">
        <div class="Wrapper Wrapper--s pt-100 pb-60">
            <div class="row">
                <div class="col-6">
                    <h2 class="ft-title-2xl ft-bold color-blueberry mb-40">Foire Aux Questions</h2>

                    <div
                        v-for="question in cols[0]"
                        class="mb-40"
                        :key="question.id"
                    >
                        <p class="ft-title-l color-blueberry ft-bold mb-5">{{ question.title }}</p>
                        <truncated-text :text="question.text" :max="150" />
                    </div>
                </div>
                <div class="col-6">
                    
                    <div
                        v-for="question in cols[1]"
                        class="mb-40"
                        :key="question.id"
                    >
                        <p class="ft-title-l color-blueberry ft-bold mb-5">{{ question.title }}</p>
                        <truncated-text :text="question.text" :max="150" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TruncatedText from '@/components/interactive/TruncatedText'

export default {
    name: 'FaqSection',
    components: { TruncatedText },
    data: () => ({
        cols: [
            [
                { id: 0, title: "Pourquoi ce groupe est-il réservé aux moins de 35 ans ?", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at mi efficitur, bibendum eros et, bibendum urna. Nulla eros risus, lobortis eu malesuada eget, dignissim eu mauris. In ac orci in nisl posuere pretium vel sit amet mi. Fusce vulputate varius odio sed congue. Suspendisse aliquet elit sed feugiat laoreet."},
                { id: 1, title: "Est-ce vraiment gratuit ?", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at mi efficitur, bibendum eros et, bibendum urna. Nulla eros risus, lobortis eu malesuada eget, dignissim eu mauris. In ac orci in nisl posuere pretium vel sit amet mi. Fusce vulputate varius odio sed congue. Suspendisse aliquet elit sed feugiat laoreet."}
            ], [
                { id: 2, title: "Puis-je venir accompagné(e) ?", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at mi efficitur, bibendum eros et, bibendum urna. Nulla eros risus, lobortis eu malesuada eget, dignissim eu mauris. In ac orci in nisl posuere pretium vel sit amet mi. Fusce vulputate varius odio sed congue. Suspendisse aliquet elit sed feugiat laoreet."},
                { id: 3, title: "Je suis timide, comment faire ?", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at mi efficitur, bibendum eros et, bibendum urna. Nulla eros risus, lobortis eu malesuada eget, dignissim eu mauris. In ac orci in nisl posuere pretium vel sit amet mi. Fusce vulputate varius odio sed congue. Suspendisse aliquet elit sed feugiat laoreet."}
            ]
        ]
    }),
}
</script>