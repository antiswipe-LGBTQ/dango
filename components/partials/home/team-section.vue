<template>
    <div class="TeamSection">
        <div class="TeamSection_slide">
            <testimony-card class="TeamSection_card" name="Pierrick" />
        </div>
    </div>
</template>

<script>
import TestimonyCard from '@/components/partials/testimony-cards/TestimonyCard'

export default {
    name: 'TeamSection',
    components: TestimonyCard
}
</script>