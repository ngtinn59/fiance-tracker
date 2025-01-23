<template>
    <div class="grid grid-cols-2 py-4 border-b drak:border-gray-800 text-gray-900 dark:text-gray-100">
        <!-- Left Section: Salary Info -->
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-1">
                <UIcon :name="icon" class="text-green-600" />
                <div>{{ transaction.description }}</div>
            </div>
            <div>
                <UBadge color="white" v-if="transaction.category">{{ transaction.category}}</UBadge>
            </div>
        </div>

        <!-- Right Section: Currency and Options -->
        <div class="flex items-center justify-end space-x-2">
            <div>{{ currency }}</div>
            <div>
                <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                    <UButton color="white" variant="ghost" trailing-icon="i-heroicons-ellipsis-horizontal"></UButton>
                </UDropdown>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    transaction: Object
});
const isIncome = computed(() => {
    return props.transaction.type === 'income';
})

const icon = computed(() => {
    return props.transaction.type === 'income' ? 'i-heroicons-arrow-up-right' : 'i-heroicons-arrow-down-right';
})

const color = computed(() => {
    return props.transaction.type === 'income' ? 'green' : 'red';
})
const { currency } = useCurrency(props.transaction.amount);
const items = [
    [
        {
            label: 'Edit',
            icon: 'i-heroicons-pencil',
            click: () => console.log('Edit')

        },
        {
            label: 'Delete',
            icon: 'i-heroicons-trash',
            click: () => console.log('Delete')
        }
    ]
]
</script>
