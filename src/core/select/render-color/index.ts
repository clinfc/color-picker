/**
 * @deprecated 渲染 色域 canvas、色值 canvas 和 不透明度条
 */

import { RGBAToSTR } from "@/util/color-conversion"
import ColorSelect from ".."

/**
 * 生成渲染函数
 */
export default function createRenderFn(cs: ColorSelect) {
    /**
     * 渲染色域条
     */
    function renderColorGamut() {
        // debugger
        const gtx = (cs.gcanvas.target as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D
        const x = cs.data.gw

        let lg = gtx.createLinearGradient(0, 0, x, 0)
        let i = (x - 2) / 6
        lg.addColorStop(1 / x, "#FF0000")
        lg.addColorStop((1 * i + 1) / x, "#FF0")
        lg.addColorStop((2 * i + 1) / x, "#0F0")
        lg.addColorStop((3 * i + 1) / x, "#0FF")
        lg.addColorStop((4 * i + 1) / x, "#00F")
        lg.addColorStop((5 * i + 1) / x, "#F0F")
        lg.addColorStop((x - 1) / x, "#FF0000")
        gtx.fillStyle = lg
        gtx.fillRect(0, 0, x, 12)
    }

    const vtx = (cs.vcanvas.target as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D
    /**
     * 渲染颜色面板
     */
    function renderColorValue(color: string) {
        const { vw: w, vh: h } = cs.data

        // 横向渐变
        let lgc = vtx.createLinearGradient(0, 0, w, 0)
        lgc.addColorStop(1 / w, "#ffffff")
        lgc.addColorStop((w - 1) / w, color)
        vtx.fillStyle = lgc
        vtx.fillRect(0, 0, w, h)

        // 纵向渐变
        let lgl = vtx.createLinearGradient(0, 0, 0, h)
        lgl.addColorStop(1 / h, "rgba(0,0,0,0)")
        lgl.addColorStop((h - 1) / h, "#000000")
        vtx.fillStyle = lgl
        vtx.fillRect(0, 0, w, h)
    }

    /**
     * 渲染透明度条
     */
    function renderColorOpacity() {
        const { r, g, b } = cs.data.rgb
        cs.agradient.css("background", `linear-gradient(to right, transparent, ${RGBAToSTR(r, g, b, 1)})`)
    }

    return {
        renderColorGamut,
        renderColorValue,
        renderColorOpacity,
    }
}
