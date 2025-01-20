<template>
    <div>
        <div class="font-bold" :class="[color]"> {{ title }}</div>
        <div class="text-2xl font-extrabold text-black drak:text-white mb2">
            <USkeleton v-if="loading" class="h-8 w-24" />
            <div v-else>{{ amount }}</div>
        </div>
   </div>
   <div>
    <USkeleton v-if="loading" class="h-4 w-24" />
    <div class="flex space-x-1 items-center text-sm">
        <UIcon name="i-heroicons:arrow-trending-up" class="w-6 h-6" :class="[color]"/>
    </div>
   </div>
</template>

<script setup>

defineProps ({
    color: String,
    title: String,
    amount: Number,
    lastAmount: Number,
    loading: Boolean
})
</script>

<style scoped>
.green {
    @apply text-green-600 dark:text-green-400;
}
.red {
    @apply text-red-600 dark:text-red-400;
}
</style>