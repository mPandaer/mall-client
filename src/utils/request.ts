// src/utils/request.js
import { extend } from 'umi-request';
import { refresh } from '@/services/user/User';
import { message } from 'antd';
import {history} from 'umi';
const baseUrl = 'http://localhost:8080';

const request = extend({
  errorHandler: async (error) => {
    const { response } = error;
    if (!response) {
      message.warning("请求失败");
      return true;
    }
    const data = await response.json();
    message.warning("请求失败");
    return data;
  }
});


request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem('refreshToken');
  const headers = {
    Authorization: `${token}`,
  };
  url = `${baseUrl}${url}`;
  return {
    url,
    options: { ...options, headers },
  };
});

request.interceptors.response.use(async (response,options) => {
  if (response.status === 401) {
    // 处理未授权访问
    const tokenEntity = await refresh({refreshToken:""});  // 尝试刷新 token
    if (tokenEntity.message !== "Success") {
      history.push("/login")
      return;
    }
    const newHeaders = {
      Authorization: `${tokenEntity.data?.accessToken}`,
      ...options.headers,
    };
    // 使用新的 token 重新发送原始请求
    const newResponse = await request(response.url, { ...options, headers: newHeaders });
    localStorage.setItem("refreshToken",tokenEntity.data?.refreshToken ?? "");
    localStorage.setItem("accessToken",tokenEntity.data?.accessToken ?? "");
    return newResponse;
  }
  return response;
});


export default request;
