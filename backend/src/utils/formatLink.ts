export default function formatLink(link: string) {
    return !link.match("https?:\/\/.*") ? "http://" + link : link;
}