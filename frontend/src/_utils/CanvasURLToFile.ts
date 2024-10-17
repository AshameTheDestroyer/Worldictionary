export function CanvasURLToFile(dataURL: string, filename: string) {
    const array = dataURL.split(",");
    const mimeType = array[0].match(/:(.*?);/)?.[1];
    const byteString = atob(array[1]);

    let n = byteString.length;
    const uint8Array = new Uint8Array(n);

    while (n--) {
        uint8Array[n] = byteString.charCodeAt(n);
    }

    return new File([uint8Array], filename, { type: mimeType });
}
