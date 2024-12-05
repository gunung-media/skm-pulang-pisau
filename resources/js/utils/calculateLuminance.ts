export default function calculateLuminance(hexColor: string): number {
    hexColor = hexColor.replace('#', '');

    // Split the hex color into RGB components
    const r = parseInt(hexColor.substring(0, 2), 16) / 255;
    const g = parseInt(hexColor.substring(2, 4), 16) / 255;
    const b = parseInt(hexColor.substring(4, 6), 16) / 255;

    // Apply the sRGB gamma correction
    const adjustedR = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const adjustedG = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const adjustedB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    // Calculate luminance
    return (0.2126 * adjustedR) + (0.7152 * adjustedG) + (0.0722 * adjustedB);
}
