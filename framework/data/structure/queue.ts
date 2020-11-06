/**
 * @description 数据结构 - 队列
 * @author fangzhicong
 */

/** 自定义 forEach 回调函数的返回值 */
export enum STATUS {
    /** 结束遍历 */
    END,
    /** 删除当前元素 */
    DELETE,
    /** 删除当前元素并结束遍历 */
    DELETE_AND_END,
}

/** 优先队列 */
export class PriorityQueue<T> {
    /**
     * 缓存数据。优先级最高的排在最前面（索引值小）；优先级越低的排在越后面（索引值大）；优先级相同的，后添加的排在后面（索引值大）
     */
    protected data: { level: number; data: T }[] = []

    /**
     * 当前缓存中的数据总条数
     */
    public get size() {
        return this.data.length
    }

    /**
     * 入列
     * @param data 需要入列的数据
     * @param level 优先级，数值越大等级越高
     */
    public enqueue(data: T, level: number = 0) {
        const item = { level, data }
        switch (this.size) {
            case 0:
                this.data.push(item)
                break
            case 1:
                this.data[0].level >= level ? this.data.push(item) : this.data.unshift(item)
                break
            default: {
                let max = this.size - 1
                // 追加到尾部的数据
                if (this.data[max].level >= level) {
                    this.data.push(item)
                    break
                }
                let min = 0
                // 追加到头部的数据
                if (this.data[min].level < level) {
                    this.data.unshift(item)
                    break
                }
                let point = Math.floor(max / 2)
                let bool = true
                // 二分搜索，确认插入位置
                while (bool) {
                    if (this.data[point].level >= level) {
                        if (max - point == 1) {
                            point = this.data[max].level >= level ? max + 1 : max
                            bool = false
                            continue
                        }
                        min = point
                        point += Math.floor((max - min) / 2)
                    } else {
                        if (point - min == 1) {
                            point = this.data[min].level >= level ? min + 1 : min
                            bool = false
                            continue
                        }
                        max = point
                        point -= Math.floor((point - min) / 2)
                    }
                }
                this.data.splice(point, 0, item)
                break
            }
        }
        return this
    }

    /**
     * 出列
     */
    public dequeue(): T | undefined {
        const item = this.data.shift()
        if (item) {
            return item.data
        }
        return undefined
    }

    /**
     * 遍历队列，支持中断循环和删除数据项。
     * @param callfn 遍历执行的函数。返回状态码或空
     */
    public forEach(callfn: (value: T, index: number, level: number) => STATUS | void) {
        for (let i = 0; i < this.size; i++) {
            const { data, level } = this.data[i]
            const status = callfn(data, i, level)

            // 终止循环
            if (STATUS.END === status) {
                break
            }
            // 删除当前元素
            else if (STATUS.DELETE === status) {
                this.data.splice(i--, 1)
            }
            // 删除当前元素并终止循环
            else if (STATUS.DELETE_AND_END === status) {
                this.data.splice(i--, 1)
                break
            }
        }
    }

    /**
     * 清理队列数据
     */
    public clear() {
        this.data.length = 0
        return this
    }
}
