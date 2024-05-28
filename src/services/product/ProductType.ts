// @ts-ignore
/* eslint-disable */

import request from "@/utils/request";


/** 查询所有商品类型 GET /product/type/all */
export async function all(options?: { [key: string]: any }) {
  return request<API.RespListProductTypeVO>('/product/type/all', {
    method: 'GET',
    ...(options || {}),
  });
}



/** 分页查询商品类型 GET /product/type/page/query */
export async function pageQueryType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQueryTypeParams,
  options?: { [key: string]: any },
) {
  return request<API.RespPageProductTypeVO>('/product/type/page/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
