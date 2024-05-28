import styles from "./style.less";
import { Button, Card, Form, Image, Input, message, Tabs, TabsProps } from 'antd';
import React, { createContext, useState } from 'react';
import { useNavigate } from '@@/exports';
import { Provider, useDispatch } from 'react-redux';
import {fetchCurrentUser} from '@/store/modules/user';
import { login,register } from '@/services/user/User';
import { persistor, store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';

/**
 * 登录参数
 */
type LoginType = API.LoginUserPO;

type RegisterType = {
  username: string;
  password: string;
  rePassword: string;
  email:string;
};




const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectTab,setSelectTab] = useState<string>("1");
  const [registerForm] = Form.useForm<RegisterType>();
  /**
   * 处理登录逻辑
   */
  const handleLogin = async (values:LoginType) => {
      const resp = await login(values);
      if (resp.message === "Success") {
        message.success("登录成功")
        localStorage.setItem("refreshToken", resp.data?.refreshToken ?? "")
        localStorage.setItem("accessToken", resp.data?.accessToken ?? "")
        // @ts-ignore
        dispatch(fetchCurrentUser());
        navigate("/");
        return;
      }
      message.error(resp.message);
  };

  const handleRegister = async (values:RegisterType) => {
    if (values.password !== values.rePassword) {
      message.warning("两次密码不一致")
      return
    }
    const resp = await register({
      username: values.username,
      password: values.password,
      email: values.email
    });
    if (resp.message === "Success") {
      console.log("注册成功",resp)
      message.success("注册成功")
      setSelectTab("1")
      registerForm.resetFields();
    }else {
      message.error("注册失败")
    }

  }

  const loginTab = (
    <Form<LoginType>
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      className={styles.form}
      initialValues={{ remember: true }}
      onFinish={async (values) => {await handleLogin(values)}}
      onFinishFailed={() => {}}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>);

  const registerTab = (
      <Form<RegisterType>
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className={styles.form}
        initialValues={{ remember: true }}
        onFinish={handleRegister}
        onFinishFailed={() => {}}
        autoComplete="off"
        form={registerForm}

      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="rePassword"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
  );

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: '登录',
      children: loginTab,
    },
    {
      key: '2',
      label: '注册',
      children: registerTab,
    }
  ]
  return (
      <div className={styles.loginPage}>
        <div className={styles.loginLeft} onClick={() => {
          navigate("/")
        }}>
          <Image preview={false}
                 src={"https://cdn.web-global.fds.api.mi-img.com/mcfe--mi-account/static/static/media/banner.92c693b4..jpg"} />
        </div>
        <div className={styles.loginRight}>
          <Card style={{ width: 500, height: 500, backgroundColor: '#f5f5f5' }}>
            <Tabs activeKey={selectTab} items={tabItems} onChange={(value) => {
              setSelectTab(value)
            }} />
          </Card>
        </div>
      </div>
  );
}


export default LoginPage;