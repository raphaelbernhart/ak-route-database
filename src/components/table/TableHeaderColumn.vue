<template>
    <div
        class="cursor-pointer text-neutral-400 min-w-16"
        @click="tableStore.sortTable(sortKey as any)"
    >
        <span class="relative">
            {{ label }}
            <span
                class="absolute transition-opacity duration-500 opacity-0 -right-6"
                :class="{ 'opacity-100': tableStore.sort.sortKey === sortKey }"
            >
                <ChevronDownIcon v-if="tableStore.sort.isDesc" class="w-5" />
                <ChevronUpIcon v-else class="w-5" />
            </span>
        </span>
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
});
</script>
