<template>
    <div class="grid grid-cols-2 py-4 border-b drak:border-gray-800 text-gray-900 dark:text-gray-100">
        <!-- Left Section: Salary Info -->
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-1">
                <UIcon name="i-heroicons-arrow-up-right" class="text-green-600" />
                <div>Salary</div>
            </div>
            <div>
                <UBadge color="white">Category</UBadge>
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
const { currency } = useCurrency(3000);

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
