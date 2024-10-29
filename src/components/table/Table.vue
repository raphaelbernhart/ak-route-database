<template>
    <div class="w-full overflow-scroll">
        <div id="table" class="ak-table" style="pointer-events: auto">
            <TableHeader class="mt-6" />

            <div
                v-if="tableStore.loading"
                class="flex justify-center w-full mt-4"
            >
                <SpinnerIcon />
            </div>

            <div
                v-if="
                    tableStore.tableEntries.length > 0 &&
                    tableStore.loading === false
                "
                class="inline-flex flex-col grid-cols-1 gap-1 mt-2"
            >
                <TableBodyRow
                    v-for="(tableRow, index) in tableStore.sortedAndFilteredTable"
                    :key="getRowKey(tableRow, index)"
                    :id="tableRow[tableStore.tableStructure.routename.key]"
                    :cells="tableRow"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTableStore } from '@/store/table';
import TableHeader from '@/components/table/TableHeader.vue';
import TableBodyRow from '@/components/table/TableBodyRow.vue';
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue';

const tableStore = useTableStore();

const getRowKey = (tableRow: Record<string, any>, index: number) => {
    const name = `${tableRow[tableStore.tableStructure.routename.key]}`
        .toLowerCase()
        .replace(/ /g, '_');
    const boltline = `${tableRow[tableStore.tableStructure.boltline.key]}`
        .toLowerCase()
        .replace(/ /g, '_');

    return `${index}-${boltline}-${name}`;
};
</script>
