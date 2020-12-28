/**
 * @author fangzhicong
 * @deprecated 数据缓存
 */

import { EventLevel } from "@/event/level"
import { Data } from "~/core/global/define"

function data() {
    return {
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
    }
}

/**
 * 使用 Proxy 实现数据过滤
 * @param data 需要被监听数据
 * @param event 事件管理器（发布订阅）
 */
function proxy(data: Data, event: EventLevel) {
    return new Proxy(data, {
        set(target, key, value) {
            if (Reflect.get(target, key) !== value) {
                if (["gx", "vx", "vy"].indexOf(key as string) !== -1) {
                    let rt = (key as string).replace("x", "w").replace("y", "h")
                    Reflect.get(target, rt) == value && value--
                }
                Reflect.set(target, key, value)
                event.emit("data", key, Reflect.get(target, key))
            }
            return true
        },
    })
}

/**
 * 使用 Object.defineProperty 实现数据过滤
 * @param data 需要被监听数据
 * @param event 事件管理器（发布订阅）
 */
function defineProperty(target: Data, event: EventLevel) {
    const temp: Data = {}

    for (let key in target) {
        Object.defineProperty(temp, key, {
            get() {
                return target[key]
            },
            set(value) {
                if (target[key] !== value) {
                    if (["gx", "vx", "vy"].indexOf(key) !== -1) {
                        let rt = (key as string).replace("x", "w").replace("y", "h")
                        target[rt] === value && value--
                    }
                    target[key] = value
                    event.emit("data", key, target[key])
                }
            },
        })
    }

    return temp
}

/**
 * 数据监听
 * @param event 事件管理器
 */
export function proxyData(event: EventLevel) {
    return window.Proxy ? proxy(data(), event) : defineProperty(data(), event)
}

/**
 * 根据 DOM 初始化数据
 */
export function initData(doms: Data, data: Data) {
    const { vcanvas, gcanvas, agradient } = doms

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

    console.log(data)
}
