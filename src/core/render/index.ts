/**
 * @deprecated 生成颜色选择器的静态 HTML
 */

import ColorPicker from ".."
import { fieldsetCard, rowGap10 } from "../global/tpl"
import createCListTpl from "./color-list"

const selectContent = `<div class="zc-cp_color-value pointer">
    <canvas width="257" height="257"></canvas>
    <div class="zc-cp_sliding circle-sliding"></div>
</div>
<div class="zc-cp_lh-10"></div>
<div class="zc-cp_color-gamut pointer">
    <canvas width="257" height="6"></canvas>
    <div class="zc-cp_sliding rect-sliding"></div>
</div>
<div class="zc-cp_lh-10"></div>
<div class="zc-cp_color-alpha pointer">
    <div class="zc-cp_color-gradient"></div>
    <div class="zc-cp_sliding rect-sliding"></div>
</div>`

const formTpl = `<div class="zc-cp_form">
        <div class="zc-cp_form-group">
            <i class="zc-cp_block preview"><i></i></i>
            <i class="zc-cp_block value">#FF0000</i>
            <i class="zc-cp_block schema">HEX</i>
        </div>
        <div class="zc-cp_lh-10"></div>
        <div class="zc-cp_form-group btn-group">
            <i class="zc-cp_block clear">清除样式</i>
            <i class="zc-cp_block cancel">取消</i>
            <i class="zc-cp_block done">确定</i>
        </div>
    </div>`

/**
 * 色盘的主体 HTML
 * @param option 配置项
 */
export default function render({ option, root }: ColorPicker) {
    // 颜色选择器的主体卡片（左侧主体）
    const lTpl = fieldsetCard(option.selectTitle, selectContent, "zc-cp_color-selector")

    // 颜色列表的主体卡片
    const listTpl = createCListTpl(option)

    // 右侧的主体
    const rTpl = `<div class="zc-cp_color-panel">${listTpl}${rowGap10}${formTpl}</div>`

    // 将静态 HTML 添加到 DOM 树中
    root.query(".zc-cp_main").html(`${lTpl}${rTpl}`)
}
