import { useEffect, useState } from "react";

export function useDateDistribution<T extends { createdAt: string }>(
    array?: Array<T>,
) {
    const [dates, setDates] = useState<Array<string>>();
    const [dateDistribution, setDateDistribution] = useState<Array<number>>();

    useEffect(() => {
        if (array == null) {
            setDates(undefined);
            setDateDistribution(undefined);
            return;
        }

        if (dates != null && dateDistribution != null) {
            return;
        }

        const dateLabels: Array<string> = [];
        const dateValues: Array<{ id: number; value: number }> = [];

        array.forEach((element) => {
            const date = new Date(element.createdAt);
            const dateID =
                date.getFullYear() * 10000 +
                date.getMonth() * 100 +
                date.getDay();
            const matchingDate = dateValues.find(
                (dateValue) => dateValue.id == dateID,
            );

            if (matchingDate != null) {
                matchingDate.value++;
                return;
            }

            dateValues.push({ id: dateID, value: 1 });
            dateLabels.push(
                date.toLocaleString("en-UK", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }),
            );
        });

        setDates(dateLabels);
        setDateDistribution(dateValues.map((dateValue) => dateValue.value));
    }, [array, dates, dateDistribution]);

    return [dates, dateDistribution] as const;
}
