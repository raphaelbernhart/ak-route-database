<template>
    <input
        v-model="modelValue"
        type="text"
        class="px-3 py-2.5 transition-shadow duration-300 rounded-lg bg-primary focus:outline-none focus:ring-1 ring-offset-2 ring-appPrimary ring-offset-background lg:min-w-56 placeholder:text-neutral-400 placeholder:font-light"
        placeholder="Search"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTableStore } from '@/store/table';

const tableStore = useTableStore();

const modelValue = computed({
    get: () => {
        return tableStore.searchValue;
    },
    set: (value) => {
        tableStore.searchValue = value;
    },
});
</script>
