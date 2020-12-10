<template>
    <div class="ParticlesEmitter" @click="emit">
        <slot></slot>

        <i
            class="ParticlesEmitter_particle"
            :class="[particle.type, { 'is-active': particle.active }]"
            :style="{
                '--transform-init': `translate3d(calc(-50% + ${particle.init[0]}px), calc(50% + ${particle.init[1]}px), 0) scale(0.5)`,
                '--transform': `translate3d(${particle.target[0]}px, ${particle.target[1]}px, 0) scale(${particle.scale})`,
                '--duration': `${particle.duration}ms`
            }"
            v-for="(particle, i) in particles"
            :key="i"
        ></i>
    </div>
</template>

<script>
export default {
    name: 'ParticlesEmitter',
    props: {
        max: { type: Number, default: 30 },
        minEmit: { type: Number, default: 5 },
        maxEmit: { type: Number, default: 10 },
        icons: { type: Array, default: () => [] }
    },
    data: () => ({
        particles: []
    }),
    mounted () {
        for (let i = 0; i < this.$props.max; i++) {
            this.$data.particles.push({
                ...this.getOptions(),
                type: this.getParticle(),
                created: new Date(),
                active: false
            })
        }
    },
    methods: {
        getParticle () {
            return this.$props.icons[this.randomBetween(0, this.$props.icons.length - 1)]
        },
        getOptions () {
            let direction = [Math.random() > 0.5 ? 1 : -1, Math.random() > 0.5 ? 1 : -1]
            let scale = (Math.random() * (1 - 0.5) + 0.5).toFixed(4)

            return {
                init: [direction[0] * this.randomBetween(0, 5), direction[1] * this.randomBetween(0, 5)],
                target: [direction[0] * this.randomBetween(10, 80), direction[1] * this.randomBetween(10, 80)],
                scale: scale,
                duration: this.randomBetween(800, 1000)
            }
        },
        emit () {
            let emitTarget = this.randomBetween(this.$props.minEmit, this.$props.maxEmit)
            let max = 0

            this.$data.particles = this.$data.particles.map(p => {
                if (new Date() - p.created > p.duration && p.active) {
                    return {
                        ...p,
                        active: false
                    }
                }
                
                if (!p.active && max < emitTarget) {
                    max++

                    return {
                        ...p,
                        ...this.getOptions(),
                        active: true,
                        created: new Date()
                    }
                }
                
                return p
            })
        }
    }
}
</script>