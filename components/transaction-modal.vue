<template>
    <UModal v-model="isOpen">
        <UCard>
            <template #header>
                <h2 class="text-xl font-bold">Add Transaction</h2>
            </template>
            <div>Hello</div>
        </UCard>
    </UModal>
</template>

<script setup>
const props = defineProps({
    modelValue: Boolean
});

const emit = defineEmits(['update:modelValue']);

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})
</script>