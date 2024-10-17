import { ColorTranslator } from "colortranslator";

export function MixColours(colour1: string, colour2: string, ratio: number = 0.5) {
    const HEXColour1 = ColorTranslator.toHEX(colour1);
    const HEXColour2 = ColorTranslator.toHEX(colour2);

    const r1 = Number("0x" + HEXColour1.substring(1, 3));
    const g1 = Number("0x" + HEXColour1.substring(3, 5));
    const b1 = Number("0x" + HEXColour1.substring(5, 7));

    const r2 = Number("0x" + HEXColour2.substring(1, 3));
    const g2 = Number("0x" + HEXColour2.substring(3, 5));
    const b2 = Number("0x" + HEXColour2.substring(5, 7));

    const r = (~~(r1 * (1 - ratio) + r2 * ratio)).toString(16).padStart(2, "0");
    const g = (~~(g1 * (1 - ratio) + g2 * ratio)).toString(16).padStart(2, "0");
    const b = (~~(b1 * (1 - ratio) + b2 * ratio)).toString(16).padStart(2, "0");

    return `#${r}${g}${b}`;
}
