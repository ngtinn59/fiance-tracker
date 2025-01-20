<template>
    <div>
        <div class="font-bold" :class="[color]"> {{ title }}</div>
        <div class="text-2xl font-extrabold text-black drak:text-white mb2">
            <USkeleton v-if="loading" class="h-8 w-24" />
            <div v-else>{{ currency }}</div>
        </div>
    </div>
    <div>
        <USkeleton v-if="loading" class="h-4 w-24" />
        <div class="flex space-x-1 items-center text-sm">
            <UIcon :name="icon" class="w-6 h-6" :class="{ 'green': trending, 'red': !trending }" />
        </div>
        <div class="text-gray-500 dark:text-gray-400">
            {{ percentageTrend }}
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    color: String,
    title: String,
    amount: Number,
    lastAmount: Number,
    loading: Boolean
})

const trending = computed(
    () => props.amount >= props.lastAmount
)

const icon = computed(
    () => trending.value ? 'i-heroicons:arrow-trending-up' : 'i-heroicons:arrow-trending-down'
)

const { currency } = useCurrency(props.amount);


const percentageTrend = computed(() => {
    if (props.amount === 0 || props.lastAmount === 0) {
        return '0%';
    }
    
    const bigger = Math.max(props.amount, props.lastAmount);
    const lower = Math.min(props.amount, props.lastAmount);
    const ratio = ((bigger - lower) / lower) * 100;
    console.log(ratio, bigger, lower);
    return `${ratio.toFixed(2)}%`;
});


</script>

<style scoped>
.green {
    @apply text-green-600 dark:text-green-400;
}

.red {
    @apply text-red-600 dark:text-red-400;
}
</style>