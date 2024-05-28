import styles from './style.less';
import { Button, Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';

export interface AddressItem {
  addressId:string,
  username: string,
  phone: string,
  province: string,
  city: string,
  detail: string
}

interface AddressFormProps {
  initValue:AddressItem,
  open:boolean,
  onCancel:() => void,
  onSubmit:(value:AddressItem) => void,
}

const AddressForm = ({initValue,open,onCancel,onSubmit}:AddressFormProps) => {
  const [form] = Form.useForm();
  const [values,setValues] = useState<AddressItem>(initValue);

  useEffect(() => {
    setValues(initValue);
  }, [initValue]);

  const onFinish = (values:AddressItem) => {
    values.addressId = initValue.addressId;
    onSubmit(values)
    form.resetFields();
  }
  return (
    <Modal
      title={"地址管理"}
      open={open}
      footer={null}
      onCancel={() => {
        form.resetFields();
        onCancel()
      }}
    >
      <Form<AddressItem>
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label="收货人姓名"
          name="username"
          initialValue={values.username}
          rules={[{ required: true, message: '必填项' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="收货人电话"
          name="phone"
          initialValue={values.phone}
          rules={[{ required: true, message: '必填项' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="省份"
          name="province"
          initialValue={values.province}
        >
          <Input />
        </Form.Item>

        <Form.Item
                   label="城市"
                   name="city"
                   initialValue={values.city}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="详细地址"
          name="detail"
          initialValue={values.detail}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );

};

export default AddressForm;