// @ts-ignore
/* eslint-disable */

import request from "@/utils/request";





/** 修改用户 POST /user/update */
export async function updateUser(body: API.UpdateUserPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}



/** 获取当前登录用户信息 GET /user/current */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<API.RespUserVO>('/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户登录 POST /user/login */
export async function login(body: API.LoginUserPO, options?: { [key: string]: any }) {
  return request<API.RespLoginUserVO>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登出 GET /user/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.RespObject>('/user/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 刷新Token GET /user/refresh */
export async function refresh(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.refreshParams,
  options?: { [key: string]: any },
) {
  return request<API.RespTokenEntity>('/user/refresh', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户注册 POST /user/register */
export async function register(body: API.RegisterUserPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function addAddress(body: API.AddAddressPO, options?: { [key: string]: any }) {
  return request<API.RespString>('/user/address/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateAddress(body: API.UpdateAddressPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/user/address/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function deleteAddress(params: API.DeleteAddressPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/user/address/delete', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

export async function queryAddressByUserId(userId: string, options?: { [key: string]: any }) {
  return request<API.RespListAddressVO>('/user/address/query', {
    method: 'GET',
    params: { userId },
    ...(options || {}),
  });
}

export async function updatePassword(po: API.UpdatePasswordPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/user/password/update', {
    method: 'POST',
    data: po,
    ...(options || {}),
  });
}

