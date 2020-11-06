/**
 * @author fangzhicong
 * @description 发布订阅模式，支持优先级设置
 */

import { PriorityQueue, STATUS } from "../data/structure/queue"

/**
 * 事件项
 */
interface EventItem {
    fn: Function
    once: boolean
}

/**
 * 事件池
 */
class EventPool extends PriorityQueue<EventItem> {}

/**
 * 事件管理器（发布订阅模式，支持事件优先级）
 */
export class EventLevel {
    /**
     * 数据池，包含不同的事件类型，每一种事件类型单独由一个事件池进行管理
     */
    protected data: Map<string, EventPool> = new Map()

    /**
     * 事件绑定
     * @param type 事件类型
     * @param fn 回调函数
     * @param level 该回调函数的优先级。数字越大，级别越高
     */
    public on(type: string, fn: Function, level: number = 0) {
        if (!this.data.has(type)) {
            this.data.set(type, new EventPool())
        }
        ;(this.data.get(type) as EventPool).enqueue({ fn, once: false }, level)
    }

    /**
     * 事件绑定（一次性事件）
     * @param type 事件类型
     * @param fn 回调函数
     * @param level 该回调函数的优先级。数字越大，级别越高
     */
    public once(type: string, fn: Function, level: number = 0) {
        if (!this.data.has(type)) {
            this.data.set(type, new EventPool())
        }
        ;(this.data.get(type) as EventPool).enqueue({ fn, once: true }, level)
    }

    /**
     * 事件解绑
     * @param type 事件类型
     * @param offFn 需要解绑的函数
     */
    public off(type: string, offFn: Function) {
        if (this.data.has(type)) {
            const pool = this.data.get(type) as EventPool
            pool.forEach(function ({ fn }, index) {
                if (offFn === fn) return STATUS.DELETE_AND_END
            })
            return true
        }
        return false
    }

    /**
     * 解绑某一类型的所有事件回调
     * @param type 事件类型
     */
    public clear(type: string) {
        if (this.data.has(type)) {
            ;(this.data.get(type) as EventPool).clear()
            return true
        }
        return false
    }

    /**
     * 事件发布
     * @param type 事件类型
     * @param args 回调函数的参数
     */
    public emit(type: string, ...args: any[]) {
        if (this.data.has(type)) {
            const pool = this.data.get(type) as EventPool
            pool.forEach(function ({ fn, once }) {
                fn(...args)
                if (once) return STATUS.DELETE
            })
        }
    }

    /**
     * 事件发布。只执行事件等级小于 level 的事件
     * @param type 事件类型
     * @param level 事件等级
     * @param args 回调函数的参数
     */
    public emitLessThan(type: string, level: number, ...args: any[]) {
        if (this.data.has(type)) {
            const pool = this.data.get(type) as EventPool
            pool.forEach(function ({ fn, once }, index, curentLevel) {
                if (curentLevel < level) {
                    fn(...args)
                    if (once) return STATUS.DELETE
                }
            })
        }
    }

    /**
     * 事件发布。只执行事件等级 level 的事件
     * @param type 事件类型
     * @param level 事件等级
     * @param args 回调函数的参数
     */
    public emitEqual(type: string, level: number, ...args: any[]) {
        if (this.data.has(type)) {
            const pool = this.data.get(type) as EventPool
            pool.forEach(function ({ fn, once }, index, curentLevel) {
                if (curentLevel == level) {
                    fn(...args)
                    if (once) return STATUS.DELETE
                }
            })
        }
    }
}
