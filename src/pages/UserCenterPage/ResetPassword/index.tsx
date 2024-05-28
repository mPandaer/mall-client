import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';

import styles from "./style.less";
import { updatePassword } from '@/services/user/User';
import { setCurrentUser } from '@/store/modules/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from '@@/exports';


type FieldType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword:string;
};
const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleExit = () => {
    dispatch(setCurrentUser({}));
  };

  const handleChangePassword = async (values:FieldType) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("两次输入的新密码不一致")
      return
    }
    const resp = await updatePassword({...values})
    if (resp.message === "Success") {
      message.success("密码更新成功,退出登录")
      handleExit()
      navigate("/login")
    }else {
      message.error(`请求失败: ${resp.message}`)
    }
  }




  return (
    <div className={styles.resetPage}>
      <div className={styles.title}>
        修改密码
      </div>

      <div className={styles.resetForm}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={(values) => {
            handleChangePassword(values);
          }}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="旧密码"
            name="oldPassword"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input.Password placeholder={"请输入旧密码"}/>
          </Form.Item>

          <Form.Item<FieldType>
            label="新密码"
            name="newPassword"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder={"请输入新密码"} />
          </Form.Item>
          <Form.Item<FieldType>
            label="确认新密码"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder={"请输入再次输入新密码"}/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  );
};


export default ResetPasswordPage;