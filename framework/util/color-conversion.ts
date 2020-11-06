/**
 * @author fangzhicong
 * @deprecated 颜色转换
 */

/**
 * RGBA 转 HEX
 * @param r RGBA 的 R
 * @param g RGBA 的 G
 * @param b RGBA 的 B
 * @param a RGBA 的 A
 */
export function RGBAToHEX(r: number, g: number, b: number, a: number = 1) {
    const hex = `#${((1 << 24) + r * (1 << 16) + g * (1 << 8) + b).toString(16).slice(1).toUpperCase()}`
    return a == 1 ? hex : `${hex}${a.toString(16).toUpperCase().slice(2, 4) || "00"}`
}

/**
 * RGBA 转 RGBA 字符串
 * @param r RGBA 的 R
 * @param g RGBA 的 G
 * @param b RGBA 的 B
 * @param a RGBA 的 A
 */
export function RGBAToSTR(r: number, g: number, b: number, a: number = 1) {
    return a == 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
}

/**
 * RGBA 转 HSL 字符串
 * https://www.rapidtables.com/convert/color/rgb-to-hsl.html
 * @param r RGBA 的 R
 * @param g RGBA 的 G
 * @param b RGBA 的 B
 * @param a RGBA 的 A
 */
export function RGBAToHSL(r: number, g: number, b: number, a: number = 1) {
    let [R, G, B] = [r, g, b].map((i) => i / 255)
    let max = Math.max(R, G, B)
    let min = Math.min(R, G, B)
    let delta = max - min
    let H = 0
    let S = 0
    let L = (min + max) / 2
    if (delta !== 0) {
        S = delta / (1 - Math.abs(2 * L - 1))
        if (max == R) {
            H = (G - B) / delta
        } else if (max == G) {
            H = (B - R) / delta + 2
        } else if (max == B) {
            H = (R - G) / delta + 4
        }
    }
    H = Math.ceil(H < 0 ? 360 + 60 * H : 60 * H)
    S = Math.ceil(S * 100)
    L = Math.ceil(L * 100)
    return a == 1 ? `hsl(${H}deg ${S}% ${L}%)` : `hsl(${H}deg ${S}% ${L}% / ${Math.round(a * 100)}%)`
}
