<template>
    <div
        class="cursor-pointer text-neutral-400"
        :style="`min-width: ${minWidth || '40px'};`"
        @click="tableStore.sortTable(sortKey as any)"
    >
        <div class="relative flex justify-start gap-x-1">
            <div>{{ label }}</div>
            <div
                class="transition-opacity duration-500 opacity-0"
                :class="{ 'opacity-100': tableStore.sort.sortKey === sortKey }"
            >
                <ChevronDownIcon v-if="tableStore.sort.isDesc" class="w-5" />
                <ChevronUpIcon v-else class="w-5" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTableStore } from '@/store/table';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue';
import ChevronUpIcon from '@/components/icons/ChevronUpIcon.vue';

const tableStore = useTableStore();

// Props
const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    dataKey: {
        type: String,
        default: '',
    },
    sortable: {
        type: Boolean,
        default: false,
    },
    sortKey: {
        type: String,
        default: '',
    },
    minWidth: {
        type: String,
        default: '',
    },
});
</script>
