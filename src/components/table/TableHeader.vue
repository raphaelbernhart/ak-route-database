<template>
    <div
        class="w-full px-5 py-3 rounded-xl bg-secondary gap-x-6"
        style="
            display: grid;
            grid-template-columns: 0.5fr 0.5fr 0.75fr 1.5fr 1fr 1.5fr;
        "
    >
        <TableHeaderColumn
            v-for="(tableHeader, tableHeaderId) in tableStore.tableStructure"
            :key="tableHeaderId"
            :label="tableHeader.name"
            :data-key="tableHeader.key"
            :sortable="tableHeader.sortable"
            :sort-key="tableHeaderId"
            :min-width="tableHeader.minWidth"
        />
    </div>
</template>

<script setup lang="ts">
import { useTableStore } from '@/store/table';
import TableHeaderColumn from '@/components/table/TableHeaderColumn.vue';

const tableStore = useTableStore();
</script>
