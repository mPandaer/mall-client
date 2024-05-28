// @ts-ignore
/* eslint-disable */

import request from "@/utils/request";


/** 分页查询商品 GET /product/query */
export async function pageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PageQueryProductPO,
  options?: { [key: string]: any },
) {
  return request<API.RespPageProductVO>('/product/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


export async function getByProductId(productId:string, options?: { [key: string]: any }) {
  return request<API.RespProductVO>(`/product/one/${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
