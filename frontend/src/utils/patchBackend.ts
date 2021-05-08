import fetchBackend from "./fetchBackend";

export default function patchBackend(endpoint: string, body?: any) {
    return fetchBackend("PATCH", endpoint, body);
}