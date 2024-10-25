import { sortBasedOnDate } from '@/helpers/sort';
import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';

export const useTableStore = defineStore('table', () => {
    const tableStructure = ref({
        boltline: {
            key: 'Boltlinje',
            name: 'Boltlinje',
            sortable: true,
        },
        grade: {
            key: 'Grad',
            name: 'Grad',
            sortable: true,
        },
        color: {
            key: 'Farve',
            name: 'Farve',
            sortable: false,
        },
        routename: {
            key: 'Rutenavn',
            name: 'Rutenavn',
            sortable: true,
        },
        constructionDate: {
            key: 'Byggedato',
            name: 'Byggedato',
            sortable: true,
        },
        routeBuilder: {
            key: 'Rutebygger',
            name: 'Rutebygger',
            sortable: false,
        },
    });
    const tableEntries = ref([]) as Ref<Array<any>>;
    const searchValue = ref('');
    const sort = ref({
        sortKey: '',
        isDesc: false,
    });
    const loading = ref(true);

    // Computed
    const filteredTable = computed(() => {
        const value = searchValue.value.trim();

        if (tableEntries.value.length === 0) {
            return;
        }

        return tableEntries.value.filter((row) => {
            return ['Rutenavn', 'Boltlinje', 'Grad', 'Farve'].some((key) => {
                return `${row[key]}`
                    .toLowerCase()
                    .includes(`${value}`.toLowerCase());
            });
        });
    });

    // Methods
    const fetchTableEntries = async () => {
        loading.value = true;

        const response = await fetch(
            'https://script.google.com/macros/s/AKfycbyvUBOuNsYfd_DiCwxJn9SlvwrWh-WnsHN1V-JLggxTfn4H4h9lyfI1pvkHj0Fh5FlJ9Q/exec',
        );

        const data = await response.json();
        if (!Array.isArray(data)) {
            return;
        }

        // Filter out faulty data
        const tableData = data.filter(
            (route) => route.Grad?.length > 0 || route.Rutenavn?.length > 0,
        );

        // Populate table data
        tableEntries.value = [...tableData];

        // Sort table based on Bygge Dato
        sortTable('constructionDate');

        loading.value = false;
    };
    const sortTable = (
        columnKey: keyof typeof tableStructure.value = 'constructionDate',
    ) => {
        // Change sortKey
        sort.value.sortKey = columnKey;

        // Change to DESC if
        const isSameSortKey = sort.value.sortKey === columnKey;

        if (sort.value.isDesc !== undefined && isSameSortKey === false) {
            sort.value.isDesc = false;
        } else {
            sort.value.isDesc = !sort.value.isDesc;
        }

        // Date sorting
        if (columnKey === 'constructionDate') {
            tableEntries.value = sortBasedOnDate(
                tableEntries.value,
                sort.value.isDesc,
            );
            return;
        }

        // Default sort
        tableEntries.value.sort((rowA, rowB) => {
            if (rowA[columnKey] > rowB[columnKey]) {
                return sort.value.isDesc ? -1 : 1;
            }
            return sort.value.isDesc ? 1 : -1;
        });
    };

    return {
        tableStructure,
        tableEntries,
        searchValue,
        sort,
        loading,
        filteredTable,
        fetchTableEntries,
        sortTable,
    };
});
