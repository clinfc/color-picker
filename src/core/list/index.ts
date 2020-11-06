/**
 * @deprecated 颜色列表
 */

import { $ } from "@/util/dom-query"
import ColorPicker from ".."
import renderColorList from "./render"

export default function ColorList(cp: ColorPicker) {
    // 渲染节点
    const root = renderColorList(cp.option)

    // 添加到颜色选择器中
    cp.root.query(".zc-cp_main").append(root)

    // 绑定事件
    root.on("click", function (e: Event) {
        if (e.target && (e.target as HTMLElement).nodeName == "I") {
            cp.event.emit("done", $(e.target as HTMLElement).attr("color"))
        }
    })
}
