export const sortBasedOnDate = (
    tableData: Array<any>,
    desc = true,
): Array<any> => {
    const clonedTableData = JSON.parse(JSON.stringify(tableData));

    clonedTableData.sort(
        (routeA: Record<string, any>, routeB: Record<string, any>) => {
            const routeADate = new Date(routeA.Byggedato).getTime();
            const routeBDate = new Date(routeB.Byggedato).getTime();
            if (desc === true) {
                return routeBDate - routeADate;
            }
            return routeADate - routeBDate;
        },
    );

    return clonedTableData;
};

export const sortBoltLine = (
    tableData: Array<any>,
    sortEntryKey: string,
    desc = true,
): Array<any> => {
    const clonedTableData = JSON.parse(JSON.stringify(tableData));

    clonedTableData.sort(
        (rowA: Record<string, any>, rowB: Record<string, any>) => {
            const aString = `${rowA[sortEntryKey]}`.replace('AB', '');
            const bString = `${rowB[sortEntryKey]}`.replace('AB', '');

            return desc === true
                ? aString.localeCompare(bString, undefined, {
                      numeric: true,
                      sensitivity: 'base',
                  })
                : bString.localeCompare(aString, undefined, {
                      numeric: true,
                      sensitivity: 'base',
                  });
        },
    );
    return clonedTableData;
};

export const sortDefault = (
    tableData: Array<any>,
    sortEntryKey: string,
    desc = true,
): Array<any> => {
    const clonedTableData = JSON.parse(JSON.stringify(tableData));

    clonedTableData.sort(
        (rowA: Record<string, any>, rowB: Record<string, any>) => {
            const aString = `${rowA[sortEntryKey]}`;
            const bString = `${rowB[sortEntryKey]}`;

            return desc === true
                ? aString.localeCompare(bString, undefined, {
                      numeric: true,
                      sensitivity: 'base',
                  })
                : bString.localeCompare(aString, undefined, {
                      numeric: true,
                      sensitivity: 'base',
                  });
        },
    );
    return clonedTableData;
};
