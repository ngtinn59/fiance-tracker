<template>
    <UModal v-model="isOpen">
        <UCard>
            <template #header>
                Add Transaction
            </template>
            <UForm :state="state" :schema="schema" ref="form" @submit.prevent="save">
                <UFormGroup :required="true" label="Transaction Type" name="type" class="mb-4">
                    <USelect placeholder="Transaction Type" :options="types" v-model="state.type"/>
                </UFormGroup>


                <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
                    <UInput type="number" placeholder="amount" v-model="state.amount"/>
                </UFormGroup>

                <UFormGroup label="Transaction date" :required="true" name="created_at" class="mb-4">
                    <UInput type="date" icon="i-heroicons-calendar-days-20-solid" v-model="state.created_at" />
                </UFormGroup>

                <UFormGroup label="Description" hint="Optional" name="description" class="mb-4">
                    <UInput placeholder="Description" v-model="state.description"/>
                </UFormGroup>


                <UFormGroup :required="true" label="Category" name="category" class="mb-4">
                    <USelect placeholder="Category" :options="categories" v-model="state.category"/>
                </UFormGroup>

                <UButton type="submit" color="black" variant="solid" label="Save" :isLoading>Save</UButton>
            </UForm>

        </UCard>
    </UModal>
</template>

<script setup>
import { categories, types } from '~/constants';
import {z} from 'zod';
const props = defineProps({
    modelValue: Boolean
});

const emit = defineEmits(['update:modelValue','saved']);
const defaultSchema = z.object({
    type: z.string().nonempty(),
    amount: z.number().positive(),
    created_at: z.string().nonempty(),
    description: z.string().optional(),
    category: z.string().nonempty()
})

const incomeSchema = z.object({
    type: z.literal('Income')
})

const expenseSchema = z.object({
    type: z.literal('Expense'),
    category: z.enum(categories)
})

const investmentSchema = z.object({
    type: z.literal('Investment')
})

const savingSchema = z.object({
    type: z.literal('Saving')
})
const schema = z.intersection(
  defaultSchema,
  z.discriminatedUnion('type', [incomeSchema, expenseSchema, investmentSchema, savingSchema])
);


const form = ref()

const isLoading = ref(false)
const supabase = useSupabaseClient()
const toast = useToast()
const save = async () => {
    if (form.value.errors.length) {
        return
    }
    isLoading.value = true
    try {
        const { error } = await supabase.from('transactions').upsert(state.value) // Không cần spread (...)
        if(!error) {
            toast.add({
                title: 'Transaction saved',
                icon: 'i-heroicons-check-circle',
                color: 'green'
            })
            isOpen.value = false
            emit('saved')
        }
    } catch (error) {
        toast.add({
            title: 'Error saving transaction',
            description: error.message,
            icon: 'i-heroicons-exclamation-circle',
            color: 'red'
        })
    } finally {
        isLoading.value = false
    }
}

const initialState = {
    type: undefined,
    amount: 0,
    created_at: undefined,
    description: undefined,
    category: undefined
}
const state = ref({...initialState})

const resetForm = () => {
    Object.assign(state.value,initialState)
}

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => {
        if(!value) {
            resetForm()
        }
        emit('update:modelValue', value)
    }
})
</script>