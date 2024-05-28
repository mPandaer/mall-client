// @ts-ignore
/* eslint-disable */

import request from "@/utils/request";



/** 查询所有商品颜色 GET /product/color/all */
export async function all2(options?: { [key: string]: any }) {
  return request<API.RespListProductColorVO>('/product/color/all', {
    method: 'GET',
    ...(options || {}),
  });
}



/** 分页查询商品颜色 GET /product/color/page/query */
export async function pageQueryColor(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQueryColorParams,
  options?: { [key: string]: any },
) {
  return request<API.RespPageProductColorVO>('/product/color/page/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


