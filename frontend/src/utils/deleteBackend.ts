import fetchBackend from "./fetchBackend";

export default function deleteBackend(endpoint: string, body?: any) {
    return fetchBackend("DELETE", endpoint, body);
}