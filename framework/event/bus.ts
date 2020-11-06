/**
 * @author fangzhicong
 * @deprecated 发布订阅模式
 */

/**
 * 事件项数据
 */
export interface EventItem {
    fn: Function
    once: boolean
}

/**
 * 遍历事件池时的自定义回调函数
 */
export type eachcall = (value: EventItem, index: number, thisArr: EventItem[]) => 0 | 1 | 2 | void

export class EventBus {
    /**
     * 事件池
     */
    protected data: Map<string, EventItem[]> = new Map()

    /**
     * 将事件函数相关数据保存到事件池中
     * @param type 事件类型
     * @param data 事件数据
     */
    protected add(type: string, data: EventItem) {
        if (!this.data.has(type)) {
            this.data.set(type, [])
        }
        ;(this.data.get(type) as EventItem[]).unshift(data)
    }

    /**
     * 遍历事件池
     * @param type 事件类型
     * @param callfn 自定义回调函数
     */
    protected forEach(type: string, callfn: eachcall) {
        if (this.data.has(type)) {
            const events = this.data.get(type) as EventItem[]
            for (let i = events.length - 1; i > 0; i--) {
                const status = callfn(events[i], i, events)
                if (status === 0) {
                    // 返回的状态码为 0，终止循环
                    break
                } else if (status === 1) {
                    // 返回的状态码为 1，删除当前元素
                    events.splice(i--, 1)
                } else if (status === 2) {
                    // 返回的状态码为 2，删除当前元素并终止循环
                    events.splice(i--, 1)
                    break
                }
            }
        }
    }

    /**
     * 绑定事件
     * @param type 事件类型
     * @param fn 事件回调
     */
    public on(type: string, fn: Function) {
        this.add(type, { fn, once: false })
    }

    /**
     * 绑定一次性事件事件
     * @param type 事件类型
     * @param fn 事件回调
     */
    public once(type: string, fn: Function) {
        this.add(type, { fn, once: true })
    }

    /**
     * 发布事件
     * @param type 事件类型
     * @param args 参数集合
     */
    public emeit(type: string, ...args: any[]) {
        this.forEach(type, ({ fn, once }) => {
            fn(...args)
            if (once) {
                return 1
            }
        })
    }

    /**
     * 事件解绑
     * @param type 事件类型
     * @param offFn 解绑的函数
     */
    public off(type: string, offFn: Function) {
        this.forEach(type, ({ fn }) => {
            if (offFn === fn) {
                return 2
            }
        })
    }
}
