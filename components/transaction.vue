<template>
    <div class="grid grid-cols-3 py-4 border-b drak:border-gray-800 text-gray-900 dark:text-gray-100">
        <!-- Left Section: Salary Info -->
        <div class="flex items-center justify-between space-x-4 col-span-2">
            <div class="flex items-center space-x-1">
                <UIcon :name="icon" :class="iconColor" />
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
                    <UButton color="white" variant="ghost" trailing-icon="i-heroicons-ellipsis-horizontal" :loading="isLoading"></UButton>
                </UDropdown>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';
import { createClient } from '@supabase/supabase-js';

const props = defineProps({
    transaction: Object
});
const emit = defineEmits(['delete']);
const isIncome = computed(() => {
    return props.transaction.type === 'Income';
});

const icon = computed(() => isIncome.value ? 'i-heroicons:arrow-trending-up' : 'i-heroicons:arrow-trending-down');

const iconColor = computed(() => isIncome.value ? 'text-green-600' : 'text-red-600');

const supabaseUrl = 'https://zysxaeapivqgnebevfcn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5c3hhZWFwaXZxZ25lYmV2ZmNuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzM4MjExNywiZXhwIjoyMDUyOTU4MTE3fQ.ltNgTfYU3xECpQEAyn008W0lQNlmYpCUAsG5Nfrmq3I';
const supabase = createClient(supabaseUrl, supabaseKey);

const { currency } = useCurrency(props.transaction.amount);
const isLoading = ref(false);
const toast = useToast(); // Sử dụng useToast

const deleteTransaction = async () => {
    isLoading.value = true;
    try {
        await supabase.from('transactions').delete().eq('id', props.transaction.id);
        toast.add({ 
            title: 'Transaction deleted', 
            icon: 'i-heroicons-check-circle',
            color: 'green'
        });
        emit('delete', props.transaction.id);
    } catch (error) {
        toast.add({ 
            title: 'Error deleting transaction', 
            icon: 'i-heroicons-exclamation-circle',
            color: 'red'
        });
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};

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
            click: deleteTransaction
        }
    ]
];
</script>
