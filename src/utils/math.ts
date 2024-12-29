
/**
 * 该函数返回指定范围内的数字。
 * @public
 * @param v - 一个你想检查它是否落在最小和最大范围之间的数字。
 * @param min - 输入数字“v”可以是的最小值。
 * @param max - 参数“max”是输入数字“v”所能达到的最大值。该函数通过在“v”大于“max”时返回“max”来确保“v”不大于“max”。
 * @returns 函数“mathBetween”返回一个在“min”和“max”参数定义的范围内的数字。如果输入的“v”小于“min”，则函数返回“min”。如果 `v` 大于 `max`，函数返回
 * `max`。如果 `v` 在 `min` 和 `max` 之间，函数返回 `v`。
 */
export function mathBetween(v: number, min: number, max: number) {
    if (min > max) {
        [min, max] = [max, min]
    }

    return Math.min(max, Math.max(min, v))
}