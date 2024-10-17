export const GOLDEN_ANGLE = 137.508;

export function GenerateColours(count: number, shuffle?: boolean) {
    const randomOffset = Math.random() * 360;

    return new Array(count)
        .fill(null)
        .map((_, i) => `hsl(${i * GOLDEN_ANGLE + randomOffset}deg, 100%, 50%)`)
        .toSorted((_, __) => (shuffle ? Math.random() - 0.5 : 0));
}
