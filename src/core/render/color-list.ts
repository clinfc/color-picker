/**
 * @deprecated 渲染颜色列表
 */

import PColor from "~/assets/json/preset.json"
import { rowGap10, fieldsetCard } from "~/core/global/tpl"
import { Option, UserCustom } from "~/core/global/define"

/** 颜色列表 */
function colorList(list: string[]) {
    return `<div class="zc-cp_color-group">${list
        .map((color) => `<i class="color-item" style="background: ${color}" color="${color}"></i>`)
        .join("")}</div>`
}

/** 颜色分组列表 */
function colorGroupList(list: string[][]) {
    return list.map((group) => colorList(group)).join(rowGap10)
}

/** 颜色列表、悬浮 title */
function colorListAndTitle(list: [string, string][]) {
    return `<div class="zc-cp_color-group">${list
        .map(([color, title]) => `<i class="color-item" style="background: ${color}" color="${color}" title="${title}"></i>`)
        .join("")}</div>`
}

/** 颜色分组列表、悬浮 title */
function colorGroupListAndTitle(list: [string, string][][]) {
    return list.map((group) => colorListAndTitle(group)).join(rowGap10)
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

export default function createCListTpl(option: Option) {
    // 渲染预定义颜色列表
    const list: string[] = [colorGroupList(PColor)]

    // 渲染自定义颜色列表
    if (option.custom && option.custom.colors.length) {
        list.push(renderCustomList(option.custom))
    }

    return fieldsetCard(option.listTitle, `<div class="zc-cp_color-list">${list.join(rowGap10)}</div>`, "zc-cp_color-list-container")
}
