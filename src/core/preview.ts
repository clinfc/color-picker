/**
 * @deprecated 控制颜色选择器的显示隐藏
 */

import { $ } from "@/util/dom-query"
import ColorPicker from "."

export function show(cp: ColorPicker) {
    //
    $(".margin").append(cp.root)
}

export function hide(cp: ColorPicker) {}
