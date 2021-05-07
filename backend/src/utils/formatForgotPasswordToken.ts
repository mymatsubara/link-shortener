export default function formatForgotPasswordToken(token: string) {
    return `forgot-password:${token}`;
}