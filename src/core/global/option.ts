/**
 *
 */

import { Option } from "./define"

export default function createOption(): Option {
    return {
        presetTitle: "预定义颜色列表",
        customTitle: "自定义颜色列表",
        change(color: string) {},
        done(color: string) {},
        cancel() {},
        clear() {},
    }
}
