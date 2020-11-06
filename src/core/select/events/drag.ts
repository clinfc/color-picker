/**
 * @deprecated 绑定滑块的 drag 事件
 */

import { EventLevel } from "@/event/level"
import DomQuery from "@/util/dom-query"
import { throttle } from "@/util/util"
import ColorSelect from ".."

/**
 * 绑定滑块的拖拽
 * @param sliding 可拖动滑块的实例
 * @param type 该滑块拖动时的可移动方式。both：上下左右都可以移动；vertical：只可以竖直移动；across：只可以水平移动
 */
function drag(sliding: DomQuery, call: (x: number, y: number) => void) {
    // 鼠标是否为按下状态
    let down = false
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

export default function bindDragEvent(cs: ColorSelect, event: EventLevel) {
    const { data, root } = cs

    // 色值
    const vsliding = root.query(".zc-cp_color-value>.zc-cp_sliding")
    drag(vsliding, function (x, y) {
        data.vw == x && x--
        data.vh == y && y--
        data.vx = x
        data.vy = y
        vsliding.offset(x, y)
        event.emitLessThan("change", 3)
    })

    // 色域
    const gsliding = root.query(".zc-cp_color-gamut>.zc-cp_sliding")
    drag(gsliding, function (x) {
        data.gw == x && x--
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
