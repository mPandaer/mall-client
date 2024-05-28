// @ts-ignore
/* eslint-disable */

import request from "@/utils/request";

/** 此处后端没有提供注释 POST /file/upload */
export async function fileUpload(
  data: FormData,
  options?: { [key: string]: any },
) {
  return request<API.RespString>('/file/upload', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
