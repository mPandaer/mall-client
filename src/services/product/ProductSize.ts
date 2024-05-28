// @ts-ignore
/* eslint-disable */

import request from "@/utils/request";


/** 查询所有商品尺寸 GET /product/size/all */
export async function all1(options?: { [key: string]: any }) {
  return request<API.RespListProductSizeVO>('/product/size/all', {
    method: 'GET',
    ...(options || {}),
  });
}


/** 分页查询商品尺寸 GET /product/size/page/query */
export async function pageQuerySize(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQuerySizeParams,
  options?: { [key: string]: any },
) {
  return request<API.RespPageProductSizeVO>('/product/size/page/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
