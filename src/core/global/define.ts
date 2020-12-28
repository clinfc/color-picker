/**
 * @deprecated 类型定义
 */

/** 回调函数 */
export type fncback = (color: string) => void

/** 系统配置项 */
export interface Option {
    /** 绑定的元素。如果设置了，该元素的 click 事件将显示色盘 */
    el?: string | HTMLElement
    /**
     * 色盘的容器，默认值 body。
     *  1、设置了 el 项：el click 时，色盘将被渲染到容器中
     *  2、未设置 el 项：初始化时直接渲染到容器中
     */
    container?: string | HTMLElement
    /** 自定义列表的 title */
    selectTitle: string
    /** 预定义颜色列表的 title */
    listTitle: string
    change: fncback
    done: fncback
    cancel: Function
    clear: Function
    custom?: UserCustom
}

/** 用户自定义颜色列表 */
export interface UserCustom {
    /** 颜色列表 */
    colors: string[] | string[][] | [string, string][] | [string, string][][]
    /** 颜色列表是否分组 */
    group?: boolean
    /** 悬浮时显示 tooltip */
    tooltip?: boolean
    /** 插入的位置。before：放在预设列表之前。after：放在预设列表之后。 */
    position?: "before" | "after"
}

/** 用户的配置项 */
export interface UserOption {
    el?: string | HTMLElement
    container?: string | HTMLElement
    listTitle?: string
    selectTitle?: string
    change?: fncback
    done?: fncback
    cancel?: Function
    clear?: Function
    custom?: UserCustom
}

export interface Data {
    [propName: string]: any
}
