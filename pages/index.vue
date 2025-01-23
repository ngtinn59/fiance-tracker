<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">
      Summary
    </h1>
    <div>
      <USelectMenu :options="transactionViewOptions" v-model="viewSelected" />
    </div>
  </section>

  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
    <Trend color="green" title="Income" :amount="incomeTotal" :last-amount="prevIncomeTotal" :loading="pending" />
    <Trend color="red" title="Expense" :amount="expenseTotal" :last-amount="prevExpenseTotal" :loading="pending" />
    <Trend color="green" title="Investments" :amount="4000" :last-amount="3000" :loading="pending" />
    <Trend color="red" title="Saving" :amount="4000" :last-amount="4100" :loading="pending" />
  </section>

  <section>
    <Transaction v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" />
  </section>
</template>

<script setup>
import { transactionViewOptions } from '~/constants';
import { createClient } from '@supabase/supabase-js';


const viewSelected = ref(transactionViewOptions[1])
const supabaseUrl = 'https://zysxaeapivqgnebevfcn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5c3hhZWFwaXZxZ25lYmV2ZmNuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzM4MjExNywiZXhwIjoyMDUyOTU4MTE3fQ.ltNgTfYU3xECpQEAyn008W0lQNlmYpCUAsG5Nfrmq3I'; // Sử dụng anon key từ Supabase Dashboard
const supabase = createClient(supabaseUrl, supabaseKey);
const transactions = ref([]);
const {data, pending} = await useAsyncData('transactions', async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    throw error;
  }
  return data;
});

transactions.value = data.value;

const transactionsGrouped = computed(() => {
  let grouped = {}

  for (const transaction of transactions.value) {
    const date = new Date(transaction.created_at).toISOString().split('T')[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(transaction);
  }
})

console.log(transactionsGrouped.value)
</script>
