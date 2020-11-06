/**
 * @deprecated 数据缓存
 */

import { EventLevel } from "@/event/level"
import ColorSelect from ".."

/**
 * 数据监听
 * @param event 事件管理器
 */
export function proxyData(event: EventLevel) {
    return new Proxy(
        {
            vw: 0,
            vh: 0,
            vx: 0,
            vy: 0,
            gw: 0,
            gx: 0,
            aw: 0,
            ax: 0,
            rgb: { r: 255, g: 0, b: 0 },
            opacity: 1,
            value: "#FF0000",
            types: ["hex", "rgb"],
            schema: "hex",
        },
        {
            set(target, key, value) {
                if (Reflect.get(target, key) !== value) {
                    Reflect.set(target, key, value)
                    event.emit("data", key, Reflect.get(target, key))
                }
                return true
            },
        }
    )
}

/**
 * 根据 DOM 初始化数据
 */
export function initData(cs: ColorSelect) {
    const { data, vcanvas, gcanvas, agradient } = cs

    // 色域
    data.gw = gcanvas.data("offsetWidth")
    data.gx = data.gw

    // 色值
    data.vw = vcanvas.data("offsetWidth")
    data.vh = vcanvas.data("offsetHeight")
    data.vx = data.vw

    // 透明度
    data.aw = agradient.data("offsetWidth")
    data.ax = data.aw
}
