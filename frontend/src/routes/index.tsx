import { useQuery } from "@tanstack/react-query";
import { HTTPManager } from "../managers/HTTPManager";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const { data } = useQuery({
        queryKey: ["users"],
        queryFn: () =>
            HTTPManager.get("users").then((response) => response.data),
    });

    return <div>{JSON.stringify(data)}</div>;
}
