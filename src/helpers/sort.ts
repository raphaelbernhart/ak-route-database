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
