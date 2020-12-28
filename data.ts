/**
 * @author fangzhicong
 * @description 数据结构 - 队列
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
}
