/**
 * @deprecated 绑定 change
 */

import { RGBAToHEX, RGBAToHSL, RGBAToSTR } from "@/util/color-conversion"
import ColorPicker from "~/core"
import ColorSelect from ".."

export default function bindChangeEvnet(cs: ColorSelect, cp: ColorPicker) {
    const event = cp.event
    const data = cs.data
    const input = cs.root.query(".value")
    const preview = cs.root.query(".preview>i")
    const gtx = (cs.gcanvas.target as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D
    const vtx = (cs.vcanvas.target as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D

    // 色域 change
    event.on(
        "change",
        function () {
            const [r, g, b] = gtx.getImageData(data.gx, 0, 1, 1).data
            cs.renderColorValue(RGBAToSTR(r, g, b))
        },
        3
    )

    // 色值 change
    event.on(
        "change",
        function () {
            const [r, g, b] = vtx.getImageData(data.vx, data.vy, 1, 1).data
            data.rgb = { r, g, b }
            cs.renderColorOpacity()
        },
        2
    )

    // 透明度 change
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
            // 显示 预览/输入框
            preview.css("background-color", data.value)
            input.text(data.value)
        },
        1
    )

    // 用户自定义 change
    event.on("change", () => {
        cp.option.change(data.value)
    })
}
