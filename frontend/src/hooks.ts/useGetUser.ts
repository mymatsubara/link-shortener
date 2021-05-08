import { setMaxListeners } from "process";
import { useEffect, useState } from "react";
import getBackend from "../utils/getBackend";
export interface MeResponse {
  id?: number;
  username?: string;
  role?: "admin" | "user"
}

export default function useGetUserInfo(): [MeResponse, boolean] {
  const [res, setRes] = useState({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      setRes({});
      setFinished(true);
    } else {
      const handleRequest = async () => {
        const rawResponse = await getBackend("/me");
        const res = await rawResponse.json();
        setRes(res.id ? JSON.parse(user) : {});
        setFinished(true);
      };
      handleRequest();
    }
  }, []);

  return [res, finished];
}
