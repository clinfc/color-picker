/**
 * @deprecated 类型定义
 */

/** 回调函数 */
export type fncback = (color: string) => void

/** 系统配置项 */
export interface Option {
    change: fncback
    done: fncback
    cancel: Function
    clear: Function
    custom?: UserCustom
    /** 自定义列表的 title */
    customTitle: string
    /** 预定义颜色列表的 title */
    presetTitle: string
}

/** 用户自定义颜色列表 */
export interface UserCustom {
    /** 颜色列表 */
    colors: string[] | string[][] | [string, string][] | [string, string][][]
    /** 颜色列表是否分组 */
    group?: boolean
    /** 悬浮时显示 tooltip */
    tooltip?: boolean
}

/** 用户的配置项 */
export interface UserOption {
    change?: fncback
    done?: fncback
    cancel?: Function
    clear?: Function
    custom?: UserCustom
    presetTitle?: string
    customTitle?: string
}

export interface Data {
    [propName: string]: any
}
