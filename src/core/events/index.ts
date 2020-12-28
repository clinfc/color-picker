/**
 * @deprecated 事件绑定
 */

import ColorPicker from ".."
import { initData } from "../data"
import createRenderFn from "../render/canvas"
import bindChangeEvnet from "./select/change"
import bindDragEvent from "./select/drag"

export function bindSelectEvent(cp: ColorPicker) {
    const { root, data, event } = cp
    // 获取 canvas 的节点
    const doms = {
        vcanvas: root.query(".zc-cp_color-value>canvas"),
        gcanvas: root.query(".zc-cp_color-gamut>canvas"),
        agradient: root.query(".zc-cp_color-gradient"),
    }

    // 获取渲染函数
    const rfn = createRenderFn(doms, data)

    // 初始化 data
    initData(doms, data)

    // 渲染 canvas
    rfn.renderColorGamut()
    rfn.renderColorValue(data.value)
    rfn.renderColorOpacity()

    // 绑定事件
    bindDragEvent(cp)
    bindChangeEvnet(cp, doms, rfn)

    // 切换显示模式
    const schema = root.query(".schema")
    schema.on("click", () => {
        let i = data.types.indexOf(data.schema)
        if (++i >= data.types.length) {
            i = 0
        }
        data.schema = data.types[i]
        event.emitLessThan("change", 2)
        schema.text(data.schema.toUpperCase())
    })
}

export function bindButtonEvent(cp: ColorPicker) {}
