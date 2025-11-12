import { defineStore } from "pinia";
import { ref } from "vue";
export const useProductStore = defineStore("product", () => { 
    let currentProductId = ref<number | null>();
    return { currentProductId };
})