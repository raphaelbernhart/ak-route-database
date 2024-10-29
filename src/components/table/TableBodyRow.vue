<template>
    <div class="inline-block transition-colors hover:bg-dark focus:bg-dark active:bg-dark rounded-xl">
        <div
            class="px-5 py-3 gap-x-6"
            style="
                display: grid;
                grid-template-columns: 0.5fr 0.5fr 0.75fr 1.5fr 1fr 1.5fr;
            "
        >
            <div
                v-for="(tableStructure, columnKey) in tableStore.tableStructure"
                :key="columnKey"
                class="flex items-center max-md:break-all gap-x-1.5"
                :style="`min-width: ${tableStructure.minWidth || '40px'};`"
            >
                <div
                    v-if="columnKey === 'color'"
                    :class="[
                        `w-2.5 h-2.5 rounded-full ${routeColorClass}`,
                        { 'bg-neutral-700': !routeColorClass },
                    ]"
                />
                <span>
                    {{ getCellLabel(cells[tableStructure.key], columnKey) }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTableStore } from '@/store/table';

// CONSTANTS
const ROUTE_COLOR_CLASSES: Record<string, string> = {
    Rød: 'bg-red-400',
    Grøn: 'bg-green-400',
    Pink: 'bg-pink-400',
    Gul: 'bg-amber-400',
    Blå: 'bg-blue-400',
    Sort: 'bg-neutral-800',
    Lilla: 'bg-purple-400',
    Hvid: 'bg-neutral-50',
    Orange: 'bg-orange-400',
    'Lys Grøn': 'bg-lime-200',
    Granit: 'bg-neutral-600',
    Grå: 'bg-neutral-300',
    Sand: 'bg-orange-200',
};

// Props
const props = defineProps({
    id: {
        type: String,
        default: '',
    },
    cells: {
        type: Object,
        default: () => {},
    },
});

const tableStore = useTableStore();

// Computed
const routeColorClass = computed(() => {
    return ROUTE_COLOR_CLASSES[
        props.cells[tableStore.tableStructure.color.key]
    ];
});

// Methods
const getCellLabel = (
    value: string,
    key: keyof typeof tableStore.tableStructure,
) => {
    if (key === 'constructionDate') {
        return new Date(value).toLocaleDateString();
    }
    if (key === 'routeBuilder') {
        return value.split('\n').join(' | ');
    }
    return value;
};
</script>
