// @ts-ignore
/* eslint-disable */

import request from "@/utils/request";




/** 查询所有商品品牌 GET /product/brand/all */
export async function all3(options?: { [key: string]: any }) {
  return request<API.RespListProductBrandVO>('/product/brand/all', {
    method: 'GET',
    ...(options || {}),
  });
}


/** 分页查询商品品牌 GET /product/brand/page/query */
export async function pageQueryBrand(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQueryBrandParams,
  options?: { [key: string]: any },
) {
  return request<API.RespPageProductBrandVO>('/product/brand/page/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

