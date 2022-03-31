<template>
    <div class="ImageLine" :class="{ 'is-loading': !this.isReady }" ref="container">
        <div class="ImageLine_rail" ref="rail">
            <div class="ImageLine_image" v-for="(image, i) in images" :key="i">
                <img :height="image.height" :src="image.content" v-if="image.subType == 'gif' || !image.subType" @load="() => loaded += 1">
                <video :height="image.height" muted autoplay loop v-else-if="image.subType == 'gifv'" @canplay="() => loaded += 1">
                    <source :src="image.content">
                </video>

            </div>
        </div>
        <div class="ImageLine_railPlaceholder">
            <div class="ImageLine_placeholder" v-for="(image, i) in images" :key="i">
                <i class="fal fa-spinner-third spin"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageLine',
    props: {
        items: { type: Array, default: () => [] },
        points: { type: String, default: '' }
    },
    data: () => ({
        availableWidth: 0,
        currentWidth: 0,
        loaded: 0,
        isReady: false
    }),
    mounted () {
        this.availableWidth = this.$refs.container.offsetWidth
    },
    watch: {
        loaded (v) {
            if (v == this.items.length && !this.isReady) this.onLoaded()
        }
    },
    computed: {
        images () {
            let height = 20 

            if (this.currentWidth) height = 20 * (this.availableWidth / this.currentWidth)

            return this.items.map(item => ({
                ...item, height
            }))
        }
    },
    methods: {
        onLoaded () {
            this.isReady = true
            this.currentWidth = this.$refs.rail.offsetWidth
        }
    }
}
</script>

<style lang="scss" scoped>
.ImageLine {
    font-size: 0;

    &.is-loading {
        
        .ImageLine_rail {
            position: absolute;
            pointer-events: none;
            opacity: 0;
        }

        .ImageLine_railPlaceholder {
            display: flex;
        }
    }
}

.ImageLine_railPlaceholder {
    display: none;
}

.ImageLine_rail {
    display: inline-flex;
}

.ImageLine_image,
.ImageLine_placeholder {
    margin-right: 5px;
    border-radius: 3px;
    flex-grow: 1;
    overflow: hidden;
    position: relative;

    &:last-child {
        margin-right: 0;
    }
}

.ImageLine_placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    font: var(--ft-m);
    color: var(--color-current);
    background-color: var(--color-current-xweak);
    height: 100px;
}

.ImageLine_points {
    font: var(--ft-title-m);
    position: absolute;
    bottom: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--color-current);
    color: var(--color-white);
}
</style>