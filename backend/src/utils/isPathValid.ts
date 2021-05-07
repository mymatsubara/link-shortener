export default function isPathValid(path: string) {
    return !!path.match(/^[-a-zA-Z0-9()@:%_\+.~#?&=]*$/);
}