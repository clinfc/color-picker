/**
 * @author fangzhicong
 * @deprecated 颜色选择器
 */

import { EventLevel } from "@/event/level"
import DomQuery, { $ } from "@/util/dom-query"
import { proxyData } from "./data"
import { bindSelectEvent } from "./events"
import { Data, Option, UserOption } from "./global/define"
import createOption from "./global/option"
import { show } from "./preview/index"
import render from "./render"

export default class ColorPicker {
    /** 配置项 */
    public option: Option

    /** 事件池（发布订阅） */
    public event: EventLevel

    /** 数据池（主要用于存放 select 的数据） */
    public data: Data

    public root: DomQuery

    constructor(option: UserOption = {}) {
        this.option = Object.assign(createOption(), option)
        this.event = new EventLevel()
        this.data = proxyData(this.event)
        this.root = $.create(`<div class="zc-cp"><div class="zc-cp_main"></div></div>`)
    }

    /** 渲染 */
    public render() {
        // 第一步：将根节点插入 DOM 树
        this.show()

        // 第二步：初始化色盘（颜色选择器 + 颜色列表）
        render(this)

        // 第三步：绑定事件（颜色选择器）
        bindSelectEvent(this)

        // 第四步：绑定列表选择事件

        // 用户事件
        // this.event.on("done", this.option.done)
        // this.event.on("cancel", this.option.cancel)
        // this.event.on("clear", this.option.clear)
    }

    public show() {
        const option = this.option

        // 没有设置容器，设置容器为 body
        if (!option.container) {
            $(document.body).append(this.root)
        } else {
            $(option.container).append(this.root)
        }
    }

    public hide() {
        const { el, container } = this.option

        if (container) {
            if (el) {
                $(container).remove(this.root)
            } else {
                this.root.hide()
            }
        }
    }
}
