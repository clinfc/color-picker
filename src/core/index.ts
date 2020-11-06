/**
 * @author fangzhicong
 * @deprecated 颜色选择器
 */

import { EventLevel } from "@/event/level"
import DomQuery, { $ } from "@/util/dom-query"
import { Option, UserOption } from "./global/define"
import createOption from "./global/option"
import ColorList from "./list"
import { show } from "./preview"
import ColorSelect from "./select"

export default class ColorPicker {
    /** 配置项 */
    public option: Option

    /** 事件池（发布订阅） */
    public event: EventLevel

    public root: DomQuery

    constructor(option: UserOption = {}) {
        this.option = Object.assign(createOption(), option)
        this.event = new EventLevel()
        this.root = $.create(`<div class="zc-cp"><div class="zc-cp_main"></div></div>`)
    }

    /** 渲染 */
    public render() {
        // 第一步：将根节点插入 DOM 树
        show(this)

        // 第二步：初始化颜色列表
        ColorList(this)

        // 第三步：初始化选择器
        const cs = new ColorSelect()
        cs.render(this)

        // 用户事件
        this.event.on("done", this.option.done)
        this.event.on("cancel", this.option.cancel)
        this.event.on("clear", this.option.clear)
    }
}
