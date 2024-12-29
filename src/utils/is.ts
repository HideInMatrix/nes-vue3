import type { Fn, RgbColor } from "@/types/nesTypes";

/**
 * 该函数检查给定值是否是对象而不是数组。
 * @public
 * @param o - 参数 o 是 any 类型，这意味着它可以是任何数据类型。
 * @returns 一个布尔值，指示输入参数“o”是否为对象。
 */
function isObject(o: any): o is object {
  return o !== null && typeof o === "object" && !Array.isArray(o);
}

/**
 * 该函数检查给定值是否为 TypeScript 中的 Date 对象。
 * @public
 * @param d - 参数 d 是 any 类型，这意味着它可以是任何数据类型。但是，该函数使用 Object.prototype.toString.call() 方法检查 date
 * 是否为 Date 对象。
 * @returns 函数 isDate 返回一个布尔值。如果输入的“d”是“Date”类型，它返回“true”，否则返回“false”。
 */
function isDate(d: any): d is Date {
  return Object.prototype.toString.call(d) === "[object Date]";
}

/**
 * 该函数检查给定值是否为正则表达式。
 * @public
 * @param r - 参数 r 是 any 类型，这意味着它可以是任何数据类型。
 * @returns 函数 isRegexp 返回一个布尔值，指示输入参数 r 是否为正则表达式 (RegExp)。如果 r 是 RegExp 对象，它返回 true ，否则返回 false 。
 * @example
 * ```ts
 * isRegexp(/a/)
 * ```
 */
function isRegexp(r: any): r is RegExp {
  return Object.prototype.toString.call(r) === "[object RegExp]";
}

/**
 * 该函数检查给定值是否为有限数。
 * @public
 * @param  n - 参数 `n` 是 `any` 类型，这意味着它可以是任何数据类型。
 * @returns 函数 isNumber 返回一个布尔值。如果输入的“n”是有限数，它返回“true”，否则返回“false”。
 * @example
 * ```ts
 * isNumber(1)// true
 * isNumber(NaN)// false
 * isNumber(Number.NEGATIVE_INFINITY)// false
 * ```
 */
function isNumber(n: any): n is number {
  return typeof n === "number" && Number.isFinite(n);
}

/**
 * 该函数检查给定变量是否为函数。
 * @public
 * @param fn - `fn` 参数是 `any` 类型，这意味着它可以是任何数据类型。然而，函数 isFn 正在检查 fn 是否是一个函数。
 * @returns 函数“isFn”返回一个布尔值，指示输入参数“fn”是否为“Fn”类型。如果 `fn` 是一个函数，它返回 `true`，否则返回 `false`。
 */
function isFn(fn: any): fn is Fn {
  return typeof fn === "function";
}

/**
 * 该函数检查给定值是否未定义。
 * @public
 * @param u - 参数“u”的类型为“any”，这意味着它可以是任何数据类型（字符串、数字、布尔值、对象等）。
 * @returns 函数 isUndefined 返回一个布尔值，指示输入参数 u 是否为 undefined 。
 */
function isUndefined(u: any): u is undefined {
  return u === void 0;
}

/**
 * 该函数检查给定值是否为空。
 * @public
 * @param n - 参数 `n` 是 `any` 类型，这意味着它可以是任何数据类型。
 * @returns 函数 isNull 返回一个布尔值，指示输入的 n 是否为空。
 */
function isNull(n: any): n is null {
  return n === null;
}

/**
 * 该函数检查给定值是否为 null 或 undefined，或者它是否为 NaN 的数字。
 * @public
 * @param t - 参数 `t` 是 `any` 类型，这意味着它可以是任何数据类型。
 * @returns 一个布尔值，指示输入参数“t”是否“null”或“undefined”。
 */
function isVoid(t: any): t is null | undefined {
  if (typeof t === "number") {
    return Number.isNaN(t);
  }

  return isNull(t) || isUndefined(t);
}

/**
 * 该函数检查值是否不为 undefined 或 null。
 * @public
 * @param t - 可以是任何类型的泛型类型参数，包括可为 null 的类型。
 * @returns 函数 isNotVoid 返回一个布尔值。如果输入的“t”不是“null”或“undefined”，则返回“true”，否则返回“false”。
 */
function isNotVoid<T>(t: T): t is NonNullable<T> {
  return !isVoid(t);
}

/**
 * 该函数检查给定字符串是否为空，并使用可选参数在检查前修剪字符串。
 * @public
 * @param s - 需要检查是否为空的输入值。它可以是任何数据类型，但此函数专门检查空字符串。
 * @param trim - 一个布尔参数，指定是否在检查字符串是否为空之前从字符串中删除空格。如果设置为
 * true，则在检查字符串长度之前将删除任何前导或尾随空格。如果未提供或设置为 false，则将按原样检查字符串。
 * @returns 函数 isEmptyString 返回一个布尔值，指示输入字符串是否为空。如果输入不是字符串，它会检查它是否为空值（null 或 undefined）并相应地返回一个布尔值。
 */
function isEmptyString(s: any, trim?: boolean): boolean {
  if (typeof s === "string") {
    return (trim === true ? s.trim() : s).length === 0;
  } else {
    return isVoid(s);
  }
}

/**
 * 该函数检查给定的输入是否为非空字符串或非空值。
 * @public
 * @param s - 需要检查是否为空的输入值。它可以是任何数据类型，但此函数专门检查空字符串。
 * @param trim - 一个布尔参数，指定是否在检查字符串是否为空之前从字符串中删除空格。如果设置为 true，将在检查字符串长度之前删除空格。如果未提供或设置为
 * false，则在检查字符串长度之前不会删除空格。
 * @returns 一个布尔值。如果输入的 s 是非空字符串（如果 trim 设置为 true ，则可选择修剪），或者如果 s 不是 null 或 undefined ，则返回 true 。否则返回
 * `false`。
 */
function isNotEmptyString(s: any, trim?: boolean): boolean {
  if (typeof s === "string") {
    return (trim === true ? s.trim() : s).length > 0;
  } else {
    return isNotVoid(s);
  }
}

/**
 * 该函数检查给定值是否为空数组或 null/undefined。
 * @public
 * @param v - 被检查为空数组的变量。
 * @param nullable - 一个布尔参数，用于确定函数是否应将空值视为空数组。如果 nullable 设置为 true，则 null 值将被视为空数组。如果 nullable
 * 设置为 false，则 null 值将不会被视为空数组，默认值为 true。
 * @returns 一个布尔值，指示输入“v”是否为空数组。如果 `v` 是一个空数组，函数返回 `true`，否则返回 `false`。该函数还采用一个可选参数 `nullable`，默认为
 * `true`。如果 `nullable` 设置为 `false`，如果 `v` 是，函数将返回 `false`
 * @example
 * ```ts
 * isEmptyArray([])// true
 * isEmptyArray(null)// false
 * isEmptyArray(null, false)// true
 * ```
 */
function isEmptyArray(v: any, nullable = true): v is [] {
  const nullCheck = nullable ? false : isVoid(v);

  return Array.isArray(v) ? v.length === 0 : nullCheck;
}

/**
 * 检查给定值是否为空对象。
 * @public
 * @param v - 被检查为空对象的变量。
 * @param nullable - 一个布尔参数，用于确定函数是否应将空值视为空对象。如果 nullable 设置为 true，则 null 值将被视为空对象。如果 nullable
 * 设置为 false，则 null 值将不会被视为空对象，默认值为 true。
 * @returns 一个布尔值。
 * @example
 * ```ts
 * isEmptyObj({})// true
 * isEmptyObj(null)// false
 * isEmptyObj(null, false)// true
 * ```
 */
function isEmptyObj(v: any, nullable = true): boolean {
  const nullCheck = nullable ? false : isVoid(v);

  return isObject(v) ? isEmptyArray(Object.keys(v)) : nullCheck;
}

/**
 * 该函数检查给定颜色是否为 RGB 颜色。
 * @public
 * @param color - 它可以是任何数据类型。
 * @returns 返回一个布尔值。
 */
function isRgbColor(color: any): color is RgbColor {
  if (!Array.isArray(color)) {
    return false;
  }

  return (
    (color.length === 4 || color.length === 3) &&
    color.every((v, i) => {
      if (i === 3) {
        return Number(v) <= 1;
      } else {
        return Number(v) <= 255;
      }
    })
  );
}

/**
 * 该函数检查给定的字符串是否是有效的十六进制颜色代码。
 * @public
 * @param color - 参数“color”是一个字符串，表示十六进制格式的颜色值。它可以有一个可选的“#”符号开头，后跟 3 到 8 个字符，可以是数字 (0-9)
 * 或字母（a-f 或 A-F）。
 * @returns 函数 isHexColor 返回一个布尔值，指示输入的 color
 * 是否是有效的十六进制颜色代码。
 */
function isHexColor(color: string): boolean {
  return color.match(/^#?[\dA-Fa-f]{3,8}$/) !== null;
}

/**
 * 该函数检查给定参数是否是 TypeScript 中的全局窗口对象。
 * @public
 * @param win - 可以是任何数据类型。
 * @returns 函数 isWindow 返回一个布尔值，指示 win 参数是否与全局 window 对象相同。
 */
function isWindow(win: any): win is Window {
  return win === window;
}

/**
 * 该函数检查给定对象是否是 TypeScript 中 Element 类的实例。
 * @public
 * @param el - 可以是任何数据类型。
 * @returns 函数 isElement 返回一个布尔值，指示输入的 el 是否是 Element 类的实例。
 */
function isElement(el: any): el is Element {
  return el instanceof Element;
}

/**
 * 该函数检查给定变量是否是 HTMLElement 类的实例。
 * @public
 * @param hel - 参数“hel”的类型为“any”，这意味着它可以是任何数据类型。
 * @returns 函数 isHtmlElement 返回一个布尔值，指示输入的 hel 是否是 HTMLElement 类的实例。
 */
function isHtmlElement(hel: any): hel is HTMLElement {
  return hel instanceof HTMLElement;
}

/**
 * 该函数检查给定对象是否是元素或window。
 * @public
 * @param el - 参数 el 可以是任何数据类型。
 * @returns 函数 isWindowOrElement 返回一个布尔值,表示给定对象是否是元素或window。
 */
function isWindowOrElement(el: any): el is Element | Window {
  return isElement(el) || isWindow(el);
}

/**
 * 该函数检查给定字符串是否是具有可选数据 URI 方案的有效 base64 编码字符串。
 * @public
 * @param str - 表示数据 URI 方案的字符串，它可能是也可能不是 base64 编码的。
 * @returns 函数 isBase64 将字符串作为输入并返回一个布尔值，指示该字符串是否是有效的 base64 编码字符串。该函数使用正则表达式检查输入字符串是否与 base64
 * 编码字符串的模式匹配。如果输入字符串与模式匹配，则函数返回“true”，否则返回“false”。
 */
function isBase64(str: string): boolean {
  return /^([\d+/a-z]{4})*([\d+/a-z]{4}|[\d+/a-z]{3}=|[\d+/a-z]{2}==)|[\d+/a-z]{3}=|[\d+/a-z]{2}==$/i.test(
    str
  );
}

/**
 * 该函数检查给定对象是否是 Blob 类的实例。
 * @public
 * @param blob - 可以是任何数据类型。
 * @returns 函数 isBlob 返回一个布尔值，指示输入参数 blob 是否是 Blob 类的实例。
 */
function isBlob(blob: any): blob is Blob {
  return blob instanceof Blob;
}

/**
 * 该函数检查给定对象是否是 File 类的实例。
 * @public
 * @param file - 可以是任何数据类型。
 * @returns 函数 isFile 返回一个布尔值，指示输入的 file 是否是 File 类的实例。如果输入是一个 File 对象，它返回 true ，否则返回 false 。
 */
function isFile(file: any): file is File {
  return file instanceof File;
}

/**
 * 该函数检查给定目标是字符串还是数字。
 * @public
 * @param target - 参数 `target` 是 `any` 类型，这意味着它可以是任何数据类型。
 * @returns 函数 isStringLike 返回一个布尔值。如果 `target` 参数是字符串或数字，则返回 `true`，否则返回 `false`。使用 typeof 运算符检查
 * target 参数以确定它是字符串还是数字，并且 isFinite 函数用于排除不是有限数字的值（例如
 */
function isStringLike(target: any): target is number | string {
  return isNumber(target) || typeof target === "string";
}

/**
 * 该函数检查给定字符串是否全是汉字，范围为 [0x4e00, 0x9fa5]。
 * @public
 * @param str - 参数 `str` 是 `any` 类型，这意味着它可以是任何数据类型
 * @returns 函数 isChinese 返回一个布尔值，指示输入的 str 是否全是汉字，范围为 [0x4e00, 0x9fa5]。
 */
function isChinese(str: string): boolean {
  return /^[\u4E00-\u9FA5]+$/.test(str);
}

/**
 * 函数正在检查给定的字符串是否是有效的电子邮件地址。它使用正则表达式将字符串与有效电子邮件地址的模式进行匹配。
 * 如果字符串与模式匹配，则函数返回“true”，表明它是有效的电子邮件地址。否则，它返回“false”。
 * @public
 * @param str - 参数 `str` 是 `any` 类型，这意味着它可以是任何数据类型
 * @returns 函数 isEmail 返回一个布尔值，指示输入的 str 是否是有效的电子邮件地址。
 */
function isEmail(str: string): boolean {
  return /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/.test(
    str
  );
}

/**
 * 判断给定的参数是否是函数
 * @param target - 参数 `target` 是 `any` 类型，这意味着它可以是任何数据类型
 * @returns 返回布尔值
 */
function isCallable<T extends Fn>(target: any): target is T {
  return typeof target === "function";
}

export {
  isBase64,
  isBlob,
  isFile,
  isFn,
  isNull,
  isNotVoid,
  isRgbColor,
  isHexColor,
  isWindow,
  isWindowOrElement,
  isStringLike,
  isEmptyArray,
  isEmptyObj,
  isEmptyString,
  isNotEmptyString,
  isDate,
  isElement,
  isHtmlElement,
  isNumber,
  isObject,
  isUndefined,
  isVoid,
  isRegexp,
  isChinese,
  isEmail,
  isCallable,
};
