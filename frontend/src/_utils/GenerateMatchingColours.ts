import { MixColours } from "./MixColours";
import { GenerateColours } from "./GenerateColours";

export function GenerateMatchingColours(
    count: number,
    channelCount: number,
    ratio: number = 0.85,
    shuffle?: boolean,
) {
    const colours = GenerateColours(count);
    const mixtureColours = GenerateColours(channelCount);

    return colours
        .map((colour, i) => MixColours(colour, mixtureColours[i % mixtureColours.length], ratio))
        .toSorted((_, __) => (shuffle ? Math.random() - 0.5 : 0));
}
