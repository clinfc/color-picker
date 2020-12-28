/**
 * @deprecated 一些公共模板的渲染
 */

/** 10px 的行间距 */
export const rowGap10 = `<div class="zc-cp_lh-10"></div>`

/**
 * 渲染卡片
 * @param title 卡片标题
 * @param content 卡片内容
 * @param css 卡片内容容器的自定义 class
 */
export function fieldsetCard(title: string, content: string, css: string = "") {
    const head = title ? `<legend  class="zc-cp_card-head">${title}</legend>` : ""
    return `<fieldset class="zc-cp_card">${head}<div class="zc-cp_card-body ${css}">${content}</div></fieldset>`
}
