<template>
    <TableSearchInput class="mb-3" />
    <div
        class="flex items-center text-neutral-400 gap-x-1.5"
        style="pointer-events: auto"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            ></path>
        </svg>
        You can sort the table with a click on a column header
    </div>
</template>

<script setup lang="ts">
import TableSearchInput from './TableSearchInput.vue';
</script>
