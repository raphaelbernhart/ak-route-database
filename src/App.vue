<template>
    <div class="flex justify-center px-4 mt-24 font-normal text-white md:px-24">
        <div class="w-full">
            <TableFilters />
            <TableComponent />
        </div>
    </div>
    <div
        class="fixed p-1 right-2 bottom-2 gap-x-1 text-neutral-400 bg-neutral-800 rounded-xl"
    >
        <div class="-rotate-90 animate-pulse">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                class="w-8 h-8"
            >
                <path
                    fill="none"
                    class="stroke-current"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="m4.5 5.25l7.5 7.5l7.5-7.5m-15 6l7.5 7.5l7.5-7.5"
                />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TableFilters from './components/filters/TableFilters.vue';
import TableComponent from './components/table/Table.vue';
import { useTableStore } from '@/store/table';

const tableStore = useTableStore();

onMounted(() => {
    tableStore.fetchTableEntries();
});
</script>
