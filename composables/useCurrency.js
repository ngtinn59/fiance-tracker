import { computed, isRef } from 'vue';

export const useCurrency = (amount) => {
    const currency = computed(() => {
        return new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
        }).format(isRef(amount) ? amount.value : amount);
    });

    return {
        currency  
    };
};
