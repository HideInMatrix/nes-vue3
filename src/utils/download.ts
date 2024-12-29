import { strUuid } from "@/utils/string";

/**
 * 此函数将画布元素下载为具有默认名称或指定名称的 PNG 图像。
 * @public
 * @param cvs - HTMLCanvasElement - 这是要作为图像下载的画布元素。
 * @param imageName - imageName 是一个字符串参数，表示下载的图像文件的名称。如果没有提供名称，将生成一个随机的 UUID（通用唯一标识符）字符串作为文件名。
 */
export function downloadCanvas(cvs: HTMLCanvasElement, imageName = strUuid()) {
  downloadByUrl(cvs.toDataURL("image/png"), imageName);
}

/**
 * 此函数使用可选文件名从给定的 URL 下载文件。
 * @public
 * @param URL - URL参数是一个字符串，表示需要下载的文件的URL。
 * @param fileName - fileName 参数是一个字符串，指定要下载的文件的名称。如果没有为 fileName 提供值，该函数将生成一个随机 UUID 字符串作为文件名。
 */
export function downloadByUrl(URL: string, fileName = strUuid()) {
  const a = document.createElement("a");
  a.href = URL;
  a.download = fileName;
  a.click();
}
