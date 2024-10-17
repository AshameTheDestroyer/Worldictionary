import { useEffect, useState } from "react";
import { usePrevious } from "./usePrevious";
import { useNavigate, useSearchParams } from "react-router-dom";

export const ROWS_PER_PAGE_OPTIONS = [10, 20, 40];

type NarrowCriteria = {
    sortKey: string;
    searchTerm: string;
    currentPage: number;
    rowsPerPage: number;
    firstRowIndex: number;
    sortType: "ascending" | "descending";
};

type WideCriteria = NarrowCriteria & {
    lastRowIndex: number;
    totalPageCount: number;
};

type CriteriaReturnType<TTotalRowCount extends number | undefined = undefined> =
    TTotalRowCount extends undefined
        ? [NarrowCriteria, (criteria: Partial<NarrowCriteria>) => void]
        : [WideCriteria, (criteria: Partial<NarrowCriteria>) => void];

export function useCriteria<TTotalRowCount extends number | undefined = undefined>(
    totalRowCount?: TTotalRowCount,
): CriteriaReturnType<TTotalRowCount> {
    const Navigate = useNavigate();
    const [searchParams, _setSearchParams] = useSearchParams();

    function GetParameters() {
        return {
            searchTerm: searchParams.get("search") ?? "",
            currentPage: Math.max(Number(searchParams.get("page") ?? 1), 1),
            rowsPerPage: Number(searchParams.get("page-rows") ?? ROWS_PER_PAGE_OPTIONS[1]),
            sortKey: searchParams.get("sort-key") ?? "",
            sortType: (searchParams.get("sort-type") ?? "ascending") as NarrowCriteria["sortType"],
        };
    }

    const [parameters, setParameters] = useState(GetParameters());
    const { sortKey, sortType, searchTerm, currentPage, rowsPerPage } = parameters;

    const previousSearchTerm = usePrevious(searchTerm);

    const firstRowIndex = (currentPage - 1) * rowsPerPage;

    const totalPageCount = totalRowCount != null ? ~~(totalRowCount / rowsPerPage) + 1 : undefined;
    const lastRowIndex =
        totalRowCount != null ? Math.min(currentPage * rowsPerPage, totalRowCount) : undefined;

    const narrowCriteria: NarrowCriteria = {
        sortKey,
        sortType,
        searchTerm,
        currentPage,
        rowsPerPage,
        firstRowIndex,
    };

    const wideCriteria: WideCriteria = {
        ...narrowCriteria,
        lastRowIndex: lastRowIndex!,
        totalPageCount: totalPageCount!,
    };

    useEffect(() => {
        setParameters(GetParameters());
    }, [searchParams]);

    useEffect(() => {
        if (previousSearchTerm != undefined && previousSearchTerm != searchTerm) {
            setParameters((parameters) => ({ ...parameters, currentPage: 1 }));
        }
    }, [searchTerm]);

    function setCriteria({
        sortKey,
        sortType,
        searchTerm,
        rowsPerPage,
        currentPage,
    }: Omit<Partial<NarrowCriteria>, "firstRowIndex">) {
        Navigate(
            "?" +
                Object.entries({
                    page: `${currentPage ?? narrowCriteria.currentPage}`,
                    "page-rows": `${rowsPerPage ?? narrowCriteria.rowsPerPage}`,
                    search: searchTerm ?? narrowCriteria.searchTerm ?? "",
                    "sort-type": sortType ?? narrowCriteria.sortType,
                    "sort-key": sortKey ?? narrowCriteria.sortKey,
                })
                    .filter(([_key, value]) => value != "")
                    .map(([key, value]) => `${key}=${value}`)
                    .join("&"),
            { replace: true },
        );
    }

    return (
        totalPageCount != null ? [wideCriteria, setCriteria] : [narrowCriteria, setCriteria]
    ) as CriteriaReturnType<TTotalRowCount>;
}
