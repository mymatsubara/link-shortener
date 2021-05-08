import fetchBackend from "./fetchBackend";

export default function postBackend(endpoint: string, body: any) {
  return fetchBackend("POST", endpoint, body);
}
