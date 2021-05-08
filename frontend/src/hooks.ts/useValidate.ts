import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGetUserInfo from "./useGetUser";

export default function useValidate() {
    const [validated, setValidated] = useState(false);
    const [user, finished] = useGetUserInfo();
    const router = useRouter();

    useEffect(() => {
        if (finished && !user.id) {
            router.push("/login");
        } else if (finished && user.id) {
            setValidated(true);
        }
    }, [finished])
    return { validated, user, finished };
}