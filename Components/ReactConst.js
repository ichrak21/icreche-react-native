export function toUpperCaseFirst(string) {
    string.toLowerCase();
    return (string.charAt(0).toUpperCase() + string.substring(1));
}