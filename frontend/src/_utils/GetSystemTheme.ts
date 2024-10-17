export function GetSystemTheme() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "Dark";
    }

    return "Light";
}
