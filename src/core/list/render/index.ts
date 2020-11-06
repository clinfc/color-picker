/**
 * @deprecated 渲染颜色列表
 */

import PColor from "~/assets/json/preset.json"
import { $ } from "@/util/dom-query"
import { Option, UserCustom } from "../../global/define"

/** 卡片标题 */
function cardHead(title: string) {
    return `<div class="zc-cp_card-head">${title}</div>`
}

/** 卡片主体 */
function cardBody(content: string) {
    return `<div class="zc-cp_card-body">${content}</div>`
}

/** 颜色列表 */
function colorList(list: string[]) {
    return `<div class="zc-cp_color-group">${list
        .map((color) => `<i class="color-item" style="background: ${color}" color="${color}"></i>`)
        .join("")}</div>`
}

/** 颜色分组列表 */
function colorGroupList(list: string[][]) {
    return list.map((group) => colorList(group)).join(`<div class="zc-cp_lh-10"></div>`)
}

/** 颜色列表、悬浮 title */
function colorListAndTitle(list: [string, string][]) {
    return `<div class="zc-cp_color-group">${list
        .map(([color, title]) => `<i class="color-item" style="background: ${color}" color="${color}" title="${title}"></i>`)
        .join("")}</div>`
}

/** 颜色分组列表、悬浮 title */
function colorGroupListAndTitle(list: [string, string][][]) {
    return list.map((group) => colorListAndTitle(group)).join(`<div class="zc-cp_lh-10"></div>`)
}

/** 渲染用户自定义颜色列表 */
function renderCustomList(option: UserCustom) {
    const { colors, group, tooltip } = option

    if (group !== true && tooltip !== true) {
        return colorList(colors as string[])
    }

    if (group === true && tooltip !== true) {
        return colorGroupList(colors as string[][])
    }

    if (group !== true && tooltip === true) {
        return colorListAndTitle(colors as [string, string][])
    }

    return colorGroupListAndTitle(colors as [string, string][][])
}

export default function renderColorList(option: Option) {
    const root = $.create(`<div class="zc-cp_color-panel"></div>`)

    // 颜色列表的 HTML 字符串
    let tpl: string

    // 渲染预定义颜色列表
    tpl = `${cardHead(option.presetTitle)}${cardBody(colorGroupList(PColor))}`

    // 渲染自定义颜色列表
    if (option.custom && option.custom.colors.length) {
        const head = cardHead(option.customTitle)
        const body = renderCustomList(option.custom)
        tpl = `${head}${body}${tpl}`
    }

    root.html(tpl)

    return root
}
