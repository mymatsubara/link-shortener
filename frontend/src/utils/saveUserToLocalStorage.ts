export interface UserData {
    id: number;
    username: string;
    role: string
}

export function saveUserToLocalStorage(data: UserData) {
    localStorage.setItem("user", JSON.stringify(data));
}