import { apiEndpoint } from "../constants";

export default function fetchBackend(method: string, endpoint: string, body?: any) {
    return fetch(apiEndpoint + endpoint, {
        method: method,
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "same-origin"
    });
}