import fetchBackend from "./fetchBackend";

export default async function getBackend(endpoint: string) {
  return fetchBackend("GET", endpoint);
}