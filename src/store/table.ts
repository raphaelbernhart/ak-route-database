import { sortBasedOnDate, sortBoltLine, sortDefault } from '@/helpers/sort';
import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';

export const useTableStore = defineStore('table', () => {
    const tableStructure = ref({
        boltline: {
            key: 'Boltlinje',
            name: '#',
            sortable: true,
            minWidth: '40px',
        },
        grade: {
            key: 'Grad',
            name: 'Grad',
            sortable: true,
            minWidth: '40px',
        },
        color: {
            key: 'Farve',
            name: 'Farve',
            sortable: false,
            minWidth: '60px',
        },
        routename: {
            key: 'Rutenavn',
            name: 'Rutenavn',
            sortable: true,
            minWidth: '100px',
        },
        constructionDate: {
            key: 'Byggedato',
            name: 'Byggedato',
            sortable: true,
            minWidth: '90px',
        },
        routeBuilder: {
            key: 'Rutebygger',
            name: 'Rutebygger',
            sortable: false,
            minWidth: '120px',
        },
    });
    const tableEntries = ref([]) as Ref<Array<any>>;
    const searchValue = ref('');
    const sort = ref({
        sortKey: 'constructionDate' as keyof typeof tableStructure.value,
        isDesc: true,
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
    const sortedAndFilteredTable = computed(() => {
        let clonedEntries = JSON.parse(JSON.stringify(filteredTable.value));

        // Date sorting
        if (sort.value.sortKey === 'constructionDate') {
            return sortBasedOnDate(clonedEntries, sort.value.isDesc);
        }

        // Bolt line sorting
        if (sort.value.sortKey === 'boltline') {
            return sortBoltLine(
                clonedEntries,
                tableStructure.value[sort.value.sortKey].key,
                sort.value.isDesc,
            );
        }

        // Default sort
        clonedEntries = sortDefault(
            clonedEntries,
            tableStructure.value[sort.value.sortKey].key,
            sort.value.isDesc,
        );

        return clonedEntries;
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

        loading.value = false;
    };
    const sortTable = (
        columnKey: keyof typeof tableStructure.value = 'constructionDate',
    ) => {
        // Change to DESC if
        const isSameSortKey = sort.value.sortKey === columnKey;

        // Change sortKey
        sort.value.sortKey = columnKey;

        if (sort.value.isDesc !== undefined && isSameSortKey === false) {
            sort.value.isDesc = false;
        } else {
            sort.value.isDesc = !sort.value.isDesc;
        }
    };

    return {
        tableStructure,
        tableEntries,
        searchValue,
        sort,
        loading,
        filteredTable,
        sortedAndFilteredTable,
        fetchTableEntries,
        sortTable,
    };
});
