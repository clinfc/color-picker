/**
 * @deprecated 选择器
 */

import DomQuery, { $ } from "@/util/dom-query"
import ColorPicker from ".."
import { Data } from "../global/define"
import { initData, proxyData } from "./data"
import createRenderFn from "./render-color"
import bindChangeEvnet from "./events/change"
import bindDragEvent from "./events/drag"

export default class ColorSelect {
    /** 数据缓存 */
    public data: Data = {}

    /** 根节点 */
    public root: DomQuery

    /** 色值的 canvas 元素 */
    public vcanvas: DomQuery

    /** 色域的 canvas 元素 */
    public gcanvas: DomQuery

    /** 不透明度的 div 元素 */
    public agradient: DomQuery

    /** 渲染色域条 */
    public renderColorGamut: Function

    /** 渲染颜色面板 */
    public renderColorValue: (color: string) => void

    /** 渲染透明度条 */
    public renderColorOpacity: Function

    constructor() {
        this.root = $.create(`<div class="zc-cp_color-selector">
            <div class="zc-cp_color-value pointer">
                <canvas width="257" height="257"></canvas>
                <div class="zc-cp_sliding circle-sliding"></div>
            </div>
            <div class="zc-cp_lh-10"></div>
            <div class="zc-cp_color-gamut pointer">
                <canvas width="257" height="12"></canvas>
                <div class="zc-cp_sliding rect-sliding"></div>
            </div>
            <div class="zc-cp_lh-10"></div>
            <div class="zc-cp_color-alpha pointer">
                <div class="zc-cp_color-gradient"></div>
                <div class="zc-cp_sliding rect-sliding"></div>
            </div>
            <div class="zc-cp_lh-10"></div>
            <div class="zc-cp_form-group">
                <i class="zc-cp_block preview"><i></i></i>
                <i class="zc-cp_block value">#FF0000</i>
                <i class="zc-cp_block schema">HEX</i>
            </div>
            <div class="zc-cp_hr"></div>
            <div class="zc-cp_form-group">
                <i class="zc-cp_block clear">清除样式</i>
                <i class="zc-cp_block cancel">取消</i>
                <i class="zc-cp_block done">确定</i>
            </div>
        </div>`)

        this.vcanvas = this.root.query(".zc-cp_color-value>canvas")
        this.gcanvas = this.root.query(".zc-cp_color-gamut>canvas")
        this.agradient = this.root.query(".zc-cp_color-gradient")

        const { renderColorGamut, renderColorValue, renderColorOpacity } = createRenderFn(this)
        this.renderColorGamut = renderColorGamut
        this.renderColorValue = renderColorValue
        this.renderColorOpacity = renderColorOpacity
    }

    public render(cp: ColorPicker) {
        const { event, root } = cp

        // 将节点添加到 DOM 树中
        root.query(".zc-cp_main").append(this.root)

        // 初始化 data
        this.data = proxyData(event)
        initData(this)

        // 渲染 canvas
        this.renderColorGamut()
        this.renderColorValue(this.data.value)
        this.renderColorOpacity()

        // 绑定 drag
        bindDragEvent(this, event)

        // 绑定 change
        bindChangeEvnet(this, cp)

        // 切换显示模式
        const schema = this.root.query(".schema")
        schema.on("click", () => {
            let i = this.data.types.indexOf(this.data.schema)
            if (++i >= this.data.types.length) {
                i = 0
            }
            this.data.schema = this.data.types[i]
            event.emitLessThan("change", 2)
            schema.text(this.data.schema.toUpperCase())
        })

        // emit clear
        this.root.query(".clear").on("click", () => {
            event.emit("clear")
        })

        // emit cancel
        this.root.query(".cancel").on("click", () => {
            event.emit("cancel")
        })

        // emit done
        this.root.query(".done").on("click", () => {
            event.emit("done", this.data.value)
        })
    }
}
