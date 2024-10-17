import axios from "axios";
import { HTTPError } from "../types";
import { StorageService } from "./StorageService";
import { ConfigurationService } from "./ConfigurationService";

import "@/_extensions";

export const BASE_URL =
    (typeof window != "undefined"
        ? ConfigurationService.GetInstance().GetConfiguration().baseURL
        : undefined) ?? import.meta.env["VITE_BACKEND_URL"];

let timerID: NodeJS.Timeout;
const TIME_LIMIT = 15 * Date.convertUnit({ from: "minutes", to: "milliseconds" });

export const HTTP = axios.create({
    baseURL: BASE_URL,
});

HTTP.interceptors.request.use(
    (configuration) => {
        if (timerID != null) {
            clearTimeout(timerID);
        }

        const token = StorageService.GetLocalAccessToken();
        if (token != null) {
            configuration.headers["Authorization"] = `Bearer ${token}`;
            timerID = setTimeout(() => {
                StorageService.ClearAll();
            }, TIME_LIMIT);
        }

        return configuration;
    },
    (error) => Promise.reject(`error: ${error}`),
);

HTTP.interceptors.response.use(
    (configuration) => (console.log(configuration), configuration),
    async (error: HTTPError) => {
        console.error(error);

        if (
            error.response?.status == 401 &&
            error.response.request["url"]?.includes("authenticate")
        ) {
            window.open("/admin/login", "_self");
        }

        return Promise.reject(error);
    },
);
