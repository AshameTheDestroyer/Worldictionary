export function TitleCaseToCamelCase(text: string): string {
    return text
        .split(" ")
        .map((word, i) => (i == 0 ? word.toLowerCase() : word[0].toUpperCase() + word.substring(1)))
        .join("");
}
