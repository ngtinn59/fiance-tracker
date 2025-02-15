import { ref, computed } from 'vue';
export const useFetchTransactions = () => {
  const supabase = useSupabaseClient();
  const transactions = ref([]);
  const isLoading = ref(false);

  const income = computed(() =>
    transactions.value.filter((transaction) => transaction.type === 'Income')
  );

  const expense = computed(() =>
    transactions.value.filter((transaction) => transaction.type === 'Expense')
  );

  const incomeCount = computed(() => income.value.length);
  const expenseCount = computed(() => expense.value.length);

  const incomeTotal = computed(() =>
    income.value.reduce((acc, transaction) => acc + transaction.amount, 0)
  );

  const expenseTotal = computed(() =>
    expense.value.reduce((acc, transaction) => acc + transaction.amount, 0)
  );

  const fetchTransactions = async () => {
    try {
      isLoading.value = true;
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      transactions.value = data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const refresh = async () => {
    await fetchTransactions();
  };

  const transactionsGroupedByDate = computed(() => {
    const grouped = {};
    for (const transaction of transactions.value) {
      const date = new Date(transaction.created_at).toISOString().split('T')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
    }
    return grouped;
  });

  return {
    transactions: {
      all: transactions,
      grouped: transactionsGroupedByDate,
    },
    income,
    expense,
    incomeCount,
    expenseCount,
    incomeTotal,
    expenseTotal,
    refresh,
    pending: isLoading, // Expose isLoading as 'pending' for the template
  };
};
