// @ts-ignore
/* eslint-disable */

import request from "@/utils/request";


export async function getOrderDetailById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrderDetailByIdParams,
  options?: { [key: string]: any },
) {
  const { orderId: param0, ...queryParams } = params;
  return request<API.RespListOrderDetailVO>(`/order/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取不同状态的订单数据 GET /order/page/query */
export async function pageQueryOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQueryOrderParams,
  options?: { [key: string]: any },
) {
  return request<API.RespIPageOrderVO>('/order/page/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


export async function addOrder(po: API.AddOrderPO, options?: { [key: string]: any }) {
  return request<API.RespString>('/order/add', {
    method: 'POST',
    data: po,
    ...(options || {}),
  });
}

export async function getOrderListByStatus(statusCode: number, options?: { [key: string]: any }) {
  return request<API.RespListOrderVO>('/order/get/status', {
    method: 'GET',
    params: { statusCode },
    ...(options || {}),
  });
}


/** 根据订单ID查询订单基本信息 GET /get/:id */
export async function getOrderById(id: string, options?: { [key: string]: any }) {
  return request<API.RespOrderVO>(`/order/get/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function flowOrderStatus(orderId: string, curOrderStatus: number, options?: { [key: string]: any }) {
  return request<API.RespObject>(`/order/flow/status?orderId=${orderId}&curOrderStatus=${curOrderStatus}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function requestRefund(orderId: string, options?: { [key: string]: any }) {
  return request<API.RespObject>(`/order/request/refund?orderId=${orderId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

