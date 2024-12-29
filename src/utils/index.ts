import { Entries } from "@/types/nesTypes";

import type { NameTable, PtTile } from "jsnes";
import { mathBetween } from "@/utils/math";

export function fillFalse(num: number): boolean[] {
  return Array(num).fill(false);
}

export function gpFilter<T>(arr: T[]): NonNullable<T>[] {
  return arr.filter(Boolean) as NonNullable<T>[];
}

export function getVramMirrorTable() {
  return getFillArr(0x8000, 0).map((_, i) => i);
}

export function compressArray(arr: number[] | Uint32Array) {
  const compressed = [];
  let current = arr[0];
  let count = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === current) {
      count++;
    } else {
      if (count > 1) {
        compressed.push(count);
        compressed.push(current);
      } else {
        compressed.push(-current - 1);
      }
      current = arr[i];
      count = 1;
    }
  }
  compressed.push(count);
  compressed.push(current);

  return compressed;
}

export function decompressArray(compressed: number[]): number[] {
  const decompressed = [];
  for (let i = 0; i < compressed.length; ) {
    if (compressed[i] < 0) {
      decompressed.push(-compressed[i] - 1);
      i++;
    } else {
      const count = compressed[i];
      const value = compressed[i + 1];
      for (let j = 0; j < count; j++) {
        decompressed.push(value);
      }
      i += 2;
    }
  }

  return decompressed;
}

export function compressPtTile(ptTile: PtTile[]): [number[], number[]] {
  const opaques: number[] = [];
  const pixs: number[] = [];
  for (let i = 0; i < ptTile.length; i++) {
    for (let j = 0; j < ptTile[i].opaque.length; j++) {
      if (ptTile[i].opaque[j] === false) {
        opaques.push(0);
      } else {
        opaques.push(1);
      }
    }
    pixs.push(...ptTile[i].pix);
  }

  return [compressArray(opaques), compressArray(pixs)];
}

export function decompressPtTile(compressed: [number[], number[]]) {
  const ptTile: PtTile[] = [];
  let opaque: boolean[] = Array(8);
  let pix: number[] = [];
  const opaques = decompressArray(compressed[0]);
  const pixs = decompressArray(compressed[1]);
  for (let i = 0; i < 512; i += 1) {
    for (let j = 0; j < 8; j += 1) {
      if (opaques[i * 8 + j] === 0) {
        opaque[j] = false;
      }
    }
    for (let j = 0; j < 64; j += 1) {
      pix[j] = pixs[i * 64 + j];
    }
    ptTile.push({
      opaque,
      pix,
    });
    opaque = Array(8);
    pix = [];
  }

  return ptTile;
}

export function compressNameTable(
  nameTable: NameTable[]
): [number[], number[]] {
  const tile: number[] = [];
  const attrib: number[] = [];
  nameTable.reduce((prev, curr) => {
    tile.push(...curr.tile);
    attrib.push(...curr.attrib);

    return prev;
  }, tile);

  return [compressArray(tile), compressArray(attrib)];
}

export function decompressNameTable(compressed: [number[], number[]]) {
  const nameTable: NameTable[] = [];
  let tile: number[] = [];
  let attrib: number[] = [];
  const tiles = decompressArray(compressed[0]);
  const attrs = decompressArray(compressed[1]);
  for (let i = 0; i < 1024 * 4; i += 1) {
    tile.push(tiles[i]);
    attrib.push(attrs[i]);
    if ((i + 1) % 1024 === 0) {
      nameTable.push({ tile, attrib });
      tile = [];
      attrib = [];
    }
  }

  return nameTable;
}

export function toHexNumber(str: string) {
  return Number(`0x${str}`);
}

/**
 * 该函数创建一个指定长度的数组，其中填充了指定的值。
 * @public
 * @param length - 长度参数是一个数字，指定要创建的数组的所需长度。
 * @param value - value 参数是将用于填充数组的值。它可以是任何数据类型。
 * @returns 函数“getFillArr”返回一个长度为“length”的数组，其中填充了值“value”。数组元素的类型由作为参数传递给函数的通用类型“T”确定。
 * @example
 * ```ts
 * getFillArr(3, 'a')
 * // ['a', 'a', 'a']
 * ```
 */
export function getFillArr<T>(length: number, value: T) {
  return Array.from<T>({ length }).fill(value);
}

/**
 * 此函数将对象的条目作为键值对数组返回。
 * @public
 * @param obj - 对象
 * @returns 函数 objectEntries 返回输入对象 obj 的键值对数组。
 */
export function objectEntries<T extends object>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}

/**
 * 此函数将画布元素转换为具有指定质量的图像元素。
 * @public
 * @param cvs - 一个 HTMLCanvasElement 对象，表示我们要转换为图像的画布元素。
 * @param quality - 质量参数是一个介于 0 和 1 之间的数字，它决定了使用 toDataURL() 方法将图像从画布元素转换为图像元素时图像的质量。值 1 表示最高质量，而值
 * 0 表示最低质量。
 * @returns 函数 canvasToImage 返回一个 HTMLImageElement 对象。
 */
export function canvasToImage(
  cvs: HTMLCanvasElement,
  quality = 1
): HTMLImageElement {
  const img = new Image();
  img.src = cvs.toDataURL("image/png", mathBetween(quality, 0, 1));

  return img;
}
