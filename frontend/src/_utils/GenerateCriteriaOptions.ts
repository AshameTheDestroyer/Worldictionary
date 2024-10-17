import { useCriteria } from "@/_hooks";

export function GenerateCriteriaOptions(criteria: ReturnType<typeof useCriteria>[0]) {
    return {
        total: true,
        sorton: criteria.sortKey,
        limit: criteria.rowsPerPage,
        search: criteria.searchTerm,
        skip: criteria.firstRowIndex,
        sort: criteria.sortType.substring(0, criteria.sortType.indexOf("c") + 1),
    };
}
