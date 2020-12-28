/**
 *
 */

import { toArray } from "./util"

export default class DomQuery {
    public target: HTMLElement

    constructor(target: HTMLElement) {
        this.target = target
    }

    /**
     * 在 DOM 树中查询符合条件的节点
     * @param selector 选择器
     */
    public static query(selector: string) {
        return new DomQuery(document.querySelector(selector) as HTMLElement)
    }

    /**
     * 用 HTML 字符串创建 HTMLElement
     * @param template 字符串模板
     */
    public static create(template: string) {
        let p = document.createElement("div")
        p.innerHTML = template
        return new DomQuery(p.firstElementChild as HTMLElement)
    }

    /**
     * 在当前节点下查询符合条件的节点
     * @param selector 选择器
     */
    public query(selector: string) {
        return new DomQuery(this.target.querySelector(selector) as HTMLElement)
    }

    /**
     * 事件绑定
     * @param type 事件类型
     * @param call 回调函数
     */
    public on(type: string, call: Function) {
        this.target.addEventListener(type, call as (e: Event) => void)
        return this
    }

    /**
     * 事件解绑
     * @param type 事件类型
     * @param call 回调函数
     */
    public off(type: string, call: Function) {
        this.target.removeEventListener(type, call as (e: Event) => void)
        return this
    }

    /**
     * 获取/设置 attribute
     */
    public attr(name: string, value?: string | Object | null) {
        // 获取 attribute
        if (value === undefined) {
            return this.target.getAttribute(name)
        }
        // 移除 attribute
        if (value === null) {
            this.target.removeAttribute(name)
            return this
        }
        // 设置 attribute
        if (typeof value === "object") {
            value = Object.entries(value)
                .map(([k, v]) => `${k}: ${v};`)
                .join("")
        }
        value ? this.target.setAttribute(name, value as string) : this.target.removeAttribute(name)
        return this
    }

    /**
     * 将 HTMLElement.style 字符串转换成 map 数组
     * @param style HTMLElement.style 字符串
     */
    public static splitStyleStr(style: string) {
        return style
            .replace(/;$/, "")
            .split(";")
            .map((item) => item.split(/:\s*/))
    }

    /**
     * 设置 Element.style
     */
    public css(name: string, value: string | number | null) {
        // 删除某一 style 属性
        if (value === null) {
            let style = this.attr("style") as string
            if (style) {
                let styles = DomQuery.splitStyleStr(style).filter(([sn]) => sn !== name)
                this.attr("style", styles)
            }
        } else {
            Reflect.set(this.target.style, name, value)
        }
        return this
    }

    /**
     * 1、name 为 undefined 时，获取 HTMLElement.classList
     * 2、status 为 undeined 时，判断 HTMLElement.classList 是否包含 name
     * 3、status 为 boolean 时，在 HTMLElement.classList 中 添加/删除 name
     * 4、status 为 string 时，在 HTMLElement.classList 中将 name 替换为 status
     */
    // public class(name?: string, status?: boolean | string) {
    //     if (name === undefined) {
    //         return this.target.classList
    //     }
    //     if (status === undefined) {
    //         return this.target.classList.contains(name)
    //     }
    //     if (typeof status === "boolean") {
    //         status ? this.target.classList.add(name) : this.target.classList.remove(name)
    //     } else {
    //         this.target.classList.replace(name, status)
    //     }
    //     return this
    // }

    /**
     * 添加 class
     */
    // public addClass(values: string | string[]) {
    //     if (Array.isArray(values)) {
    //         this.target.classList.add(...values)
    //     } else {
    //         this.target.classList.add(values)
    //     }
    //     return this
    // }

    /**
     * nodeName（已被转化为小写）
     */
    public nodeName() {
        return this.target.nodeName.toLowerCase()
    }

    /**
     * children
     */
    public children() {
        return toArray(this.target.children).map((elem) => new DomQuery(elem))
    }

    /**
     * parent
     */
    public parent() {
        return new DomQuery(this.target.parentElement as HTMLElement)
    }

    /**
     * getBoundingClientRect
     */
    public clientRect() {
        return this.target.getBoundingClientRect()
    }

    /**
     * 获取/设置 value
     */
    // public value(value?: string) {
    //     if (value) {
    //         ;(this.target as HTMLInputElement).value = value
    //     }
    //     return (this.target as HTMLInputElement).value
    // }

    /**
     * 获取/设置/添加 prototype 属性
     * @param name prototype 上的属性名
     * @param value prototype 上的属性值
     */
    public data<T>(name: string, value?: T) {
        if (value) {
            Reflect.set(this.target, name, value)
        }
        return Reflect.get(this.target, name)
    }

    /**
     * 显示元素
     */
    // public show() {
    //     this.css("display", "block")
    //     return this
    // }

    /**
     * 隐藏元素
     */
    public hide() {
        this.css("display", "none")
        return this
    }

    public html(html?: string) {
        if (html) {
            this.target.innerHTML = html
            return this
        }
        return this.target.innerHTML
    }

    public text(text?: string) {
        if (text) {
            this.target.innerText = text
            return this
        }
        return this.target.innerText
    }

    /**
     * 定位偏移
     * @param x left
     * @param y top
     */
    public offset(x: number, y: number) {
        return this.css("left", `${x}px`).css("top", `${y}px`)
    }

    public append(child: DomQuery | Element | Node) {
        if (child instanceof DomQuery) {
            child = child.target
        }
        this.target.appendChild(child)
        return this
    }

    public remove(child?: DomQuery | Element | Node) {
        if (child) {
            if (child instanceof DomQuery) {
                this.target.removeChild(child.target)
            } else {
                this.target.removeChild(child)
            }
        } else {
            this.target.parentNode?.removeChild(this.target)
        }
        return this
    }
}

export function $(target: HTMLElement | string) {
    if (typeof target === "string") {
        return DomQuery.query(target)
    }
    return new DomQuery(target)
}

$.create = function (template: string) {
    return DomQuery.create(template)
}
