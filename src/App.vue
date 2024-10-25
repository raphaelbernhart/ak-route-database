<template>
    <div class="flex justify-center px-4 mt-24 text-white md:px-24 font-light">
        <div class="w-full">
            <TableFilters />
            <TableComponent />
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
