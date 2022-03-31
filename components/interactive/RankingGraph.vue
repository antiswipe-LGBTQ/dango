<template>
    <div class="RankingGraph is-blueberry">
        <p class="ft-title-l color-current text-left mb-20">{{ title }}</p>
        <div>
            <div class="RankingGraph_bar" v-for="(bar, i) in bars" :key="i" :style="{ '--percentage': bar.percentage }">
                <div class="RankingGraph_barValue">
                    {{ bar[valueId] }} messages
                </div>
                <div class="RankingGraph_label ellipsis-1">
                    <div class="image-round mr-5" :style="{ backgroundImage: `url(${bar.picture ? bar.picture : ''})` }"></div> {{ bar[labelId] }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RankingGraph',
    props: {
        items: { type: Array, default: () => [] },
        title: { type: String, default: '' },
        labelId: { type: String, default: 'username' },
        valueId: { type: String, default: 'monthly' }
    },
    computed: {
        bars () {
            let bars = this.items.sort((a, b) => b[this.valueId] - a[this.valueId])
            let max = this.items[0][this.valueId]

            return bars.map(b => ({
                ...b,
                percentage: b[this.valueId] / max
            }))
        }
    }
}
</script>

<style lang="scss" scoped>
    .RankingGraph {
        background-color: var(--color-blueberry-2xweak);
        padding: 20px;
        border-radius: 20px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    .RankingGraph_bar {
        display: flex;
        margin: 4px 0;
    }

    .RankingGraph_barValue {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: calc(100% * var(--percentage));
        border-radius: 6px;
        height: 35px;
        padding: 0 10px 4px;
        font: var(--ft-title-m);
        line-height: 0.2;
        color: var(--color-white);
        background-color: var(--color-blueberry);
    }

    .RankingGraph_label {
        text-align: left;
        word-break: break-all;
        width: 200px;
        font: var(--ft-title-m);
        line-height: 1.8;
        padding-left: 10px;
    }
</style>