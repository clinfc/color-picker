/**
 * @author fangzhicong
 * @deprecated 函数
 */

/**
 * 转换为数组
 */
export function toArray<T>(tar: T) {
    return Array.prototype.slice.call(tar)
}

/**
 * 防抖
 * @param fn 防抖函数
 * @param ms 防抖延迟
 */
export function debounce(fn: Function, ms: number) {
    let timer: NodeJS.Timeout | null
    return function raf(...args: any[]) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            fn(...args)
            // clearTimeout(timer as NodeJS.Timeout)
            timer = null
        }, ms)
    }
}

/**
 * 节流
 * @param fn 节流函数
 * @param ms 节流间隔
 */
export function throttle(fn: Function, ms: number) {
    let timer = Date.now()
    return function (...args: any[]) {
        if (timer <= Date.now()) {
            fn(...args)
            timer += ms
        }
    }
}
