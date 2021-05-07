export default function anonymizeEmail(email: string) {
  const [prefix, suffix] = email.split("@");
  const asteriskCount = prefix.length - 3 > 0 ? prefix.length - 3 : 0;
  return prefix.substr(0, 3) + "*".repeat(asteriskCount) + "@" + suffix;
}
