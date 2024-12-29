import { mathBetween } from "@/utils/math";

/**
 * 生成 UUID 字符串。
 * @public
 * @returns 返回表示 UUID（通用唯一标识符）的字符串。
 */
export function strUuid(): string {
  let uuid = "";
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    uuid = crypto.randomUUID();
  } else if (typeof Blob === "undefined") {
    uuid = `${strRandom(8)}-${strRandom(4)}-${strRandom(4)}-${strRandom(
      4
    )}-${strRandom(12)}`;
  } else {
    const urlUuid = URL.createObjectURL(new Blob());
    uuid = urlUuid.toString().substring(urlUuid.lastIndexOf("/") + 1);
    URL.revokeObjectURL(urlUuid);
  }

  return uuid;
}

/**
 * 该函数生成指定长度和基数的随机字符串。
 * @public
 * @param count - 将生成的随机字符串中的字符数。
 * @param radix - Radix 是指用于随机字符串生成的基数系统。默认值为 16，这意味着字符串将使用十六进制数字（0-9 和 A-F）生成。但是，可以将基数设置为 2 到 36
 * 之间的任何值以使用
 * @returns 具有指定长度和基数（基数）的随机生成的字符串。 radix 是可选的，如果未提供则默认为 16。
 */
export function strRandom(count: number, radix = 16) {
  radix = mathBetween(radix, 2, 36);
  let result = "";
  for (let i = 1; i <= count; i++) {
    result += Math.floor(Math.random() * radix).toString(radix);
  }

  return result;
}
