/**
 *
 */

import { Option } from "./define"

export default function createOption(): Option {
    return {
        listTitle: "颜色列表",
        selectTitle: "颜色选择器",
        change(color: string) {},
        done(color: string) {},
        cancel() {},
        clear() {},
    }
}
