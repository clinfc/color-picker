/**
 * @deprecated 绑定滑块的 drag 事件
 */

import DomQuery from "@/util/dom-query"
import { throttle } from "@/util/util"
import ColorPicker from "../.."

/**
 * 绑定滑块的拖拽
 * @param sliding 可拖动滑块的实例
 * @param call 拖拽回调，将鼠标当前位置距离滑块父容器左上角的 x/y 轴值传入回调
 */
function drag(sliding: DomQuery, call: (x: number, y: number) => void) {
    // 滑块的父容器
    const parent = sliding.parent()

    parent.on("mousedown", function (e: MouseEvent) {
        // 直接点击在容器上才执行
        if (e.target != sliding.target) {
            call(e.offsetX, e.offsetY)
        }

        // 鼠标移动回调
        const mousemove = throttle(function (e: MouseEvent) {
            // 最大宽高
            const { width, height, left, top } = parent.clientRect()
            let x = e.clientX - left
            let y = e.clientY - top
            x = x < 0 ? 0 : x >= width ? width : x
            y = y < 0 ? 0 : y >= height ? height : y
            call(x, y)
        }, 40)

        // 鼠标弹起回调
        function mouseup() {
            document.removeEventListener("mousemove", mousemove)
            document.removeEventListener("mouseup", mouseup)
        }

        document.addEventListener("mousemove", mousemove)
        document.addEventListener("mouseup", mouseup)
    })
}

/**
 * 绑定色域、色值、透明度的滑块拖拽事件
 * @param param 颜色选择器的实例
 */
export default function bindDragEvent({ data, root, event }: ColorPicker) {
    // 色值
    const vsliding = root.query(".zc-cp_color-value>.zc-cp_sliding")
    drag(vsliding, function (x, y) {
        data.vx = x
        data.vy = y
        vsliding.offset(x, y)
        event.emitLessThan("change", 3)
    })

    // 色域
    const gsliding = root.query(".zc-cp_color-gamut>.zc-cp_sliding")
    drag(gsliding, function (x) {
        data.gx = x
        gsliding.offset(x, 0)
        event.emit("change")
    })

    // 不透明度
    const osliding = root.query(".zc-cp_color-alpha>.zc-cp_sliding")
    drag(osliding, function (x) {
        data.opacity = parseFloat(`${x / data.aw}`.slice(0, 4))
        data.ax = x
        osliding.offset(x, 0)
        event.emitLessThan("change", 2)
    })
}
