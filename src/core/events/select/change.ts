/**
 * @author fangzhicong
 * @deprecated 绑定 change
 */

import { RGBAToHEX, RGBAToHSL, RGBAToSTR } from "@/util/color-conversion"
import ColorPicker from "~/core"
import { Data } from "~/core/global/define"

export default function bindChangeEvnet(cp: ColorPicker, doms: Data, rfn: Data) {
    const { data, event, root } = cp

    const input = root.query(".value")
    const preview = root.query(".preview>i")

    // 色域条 canvas 的 CanvasRenderingContext2D API
    const gtx = (doms.gcanvas.target as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D
    // 色值面板 canvas 的 CanvasRenderingContext2D API
    const vtx = (doms.vcanvas.target as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D

    // 订阅色域 drag 发布的 change
    event.on(
        "change",
        function () {
            const [r, g, b] = gtx.getImageData(data.gx, 0, 1, 1).data
            // 渲染色值面板
            rfn.renderColorValue(RGBAToSTR(r, g, b))
        },
        3
    )

    // 订阅色值 drag 发布的 change
    event.on(
        "change",
        function () {
            const [r, g, b] = vtx.getImageData(data.vx, data.vy, 1, 1).data
            data.rgb = { r, g, b }
            // 渲染透明度条
            rfn.renderColorOpacity()
        },
        2
    )

    // 订阅透明度 drag 发布的 change
    event.on(
        "change",
        function () {
            const { r, g, b } = data.rgb
            // 生成最终值
            switch (data.schema) {
                case "hex":
                    data.value = RGBAToHEX(r, g, b, data.opacity)
                    break
                case "rgb":
                    data.value = RGBAToSTR(r, g, b, data.opacity)
                    break
                case "hsl":
                    data.value = RGBAToHSL(r, g, b, data.opacity)
                    break
            }
            // 刷新预览框
            preview.css("background-color", data.value)
            // 刷新输出框
            input.text(data.value)
        },
        1
    )

    // 用户自定义 change
    event.on("change", () => {
        cp.option.change(data.value)
    })
}
