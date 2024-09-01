const ALPHABETS = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';

const getRandomCharOrNumber = (): string => {
    const allChars = ALPHABETS + DIGITS;
    return allChars[Math.floor(Math.random() * allChars.length)];
};

export function generatePattern(): string {
    const generateSegment = (length: number): string => {
        return Array.from({ length }, () => getRandomCharOrNumber()).join('');
    };

    const segment1 = generateSegment(3);
    const segment2 = generateSegment(3);
    const segment3 = generateSegment(4);

    return `${segment1}-${segment2}-${segment3}`;
}
