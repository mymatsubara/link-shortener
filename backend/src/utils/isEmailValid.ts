export default function isEmailValid(email: string) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email.toLowerCase());
}