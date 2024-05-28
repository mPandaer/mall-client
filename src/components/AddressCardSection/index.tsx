import styles from './style.less';
import { Button, Card, Col, Divider, message, Row } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import AddressForm, { AddressItem } from '@/pages/UserCenterPage/AddressForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, deleteAddress, setSelectedAddress, updateAddress } from '@/store/modules/address';
import {addAddress as addAddressAPI,
  updateAddress as updateAddressAPI,
  deleteAddress as deleteAddressAPI,
  queryAddressByUserId
} from "@/services/user/User"

type AddressCardSectionProps = {
  supportDelete:boolean;
}

const emptyAddress:AddressItem = {
  addressId:"",
  username: "",
  phone: "",
  province: "",
  city: "",
  detail: ""
}

const AddressCardSection = ({supportDelete}:AddressCardSectionProps) => {
  const [openAddForm,setOpenAddForm] = useState(false);
  const [curAddress,setCurAddress] = useState<AddressItem>(emptyAddress);
  const addressItem = useSelector((state:any) => state.address.addressItem)
  const currentUser = useSelector((state:any) => state.user.currentUser);
  const [usedAddress, setUsedAddress] = useState<AddressItem>(addressItem[0]);
  const dispatch = useDispatch();

  const onCancel = () => {
    setOpenAddForm(false);
  }

  //添加/修改地址
  const onSubmit = async (value:AddressItem) => {
    if (value.addressId) {
      const resp = await updateAddressAPI({
        addressId: value.addressId,
        userId: currentUser.userId,
        recipientName: value.username,
        recipientPhone: value.phone,
        province: value.province,
        city: value.city,
        address: value.addressId
      })
      if (resp.message === "Success") {
        dispatch(updateAddress(value))
        message.success("更新成功")
      }else {
        message.success("更新失败")
      }

    }else {
      const resp = await addAddressAPI({
        userId: currentUser.userId,
        recipientName: value.username,
        recipientPhone: value.phone,
        province: value.province,
        city: value.city,
        address: value.detail
      })
      if (resp.message === "Success") {
        value.addressId = resp.data ?? ""
        dispatch(addAddress(value))
        message.success("添加成功")
      }else {
        message.success("添加失败")
      }
    }
    setOpenAddForm(false)
    setCurAddress(emptyAddress)

  }

  const handleUpdateAddress = (item:AddressItem) => {
    setCurAddress(item);
    setOpenAddForm(true);
  }

  const handleDeleteAddress = async (item:AddressItem) => {
    const resp = await deleteAddressAPI({
      addressId: item.addressId,
      userId: currentUser.userId
    })
    if (resp.message === "Success") {
      dispatch(deleteAddress(item));
      message.success("删除成功")
    }
  }

  const handleUseAddress = (item:AddressItem) => {
    dispatch(setSelectedAddress(item))
    //改变选中卡片的样式
    setUsedAddress(item);
  }


  return (
    <div className={styles.addressArea}>
      <Row gutter={[16, 24]}>
        {
          addressItem.map((item:AddressItem) => (
            <Col span={6}>
              <Card title={item.username} bordered={true} extra={
                <>
                  {
                    usedAddress.addressId !== item.addressId && <Button type={"link"} onClick={() => {
                      handleUseAddress(item);
                    }}> 使用</Button>
                  }
                  <Button type={"link"} onClick={() => {
                    handleUpdateAddress(item);
                  }}> 修改</Button>
                  {supportDelete &&  <Button type={"link"} onClick={() => {
                    handleDeleteAddress(item);
                  }}> 删除</Button>}
                </>
              } style={{ height: 150 }} className={usedAddress.addressId === item.addressId ? styles.active: ""}

              >
                <div className={styles.phone}>{item.phone}</div>
                <div className={styles.fullAddress}>{`${item.province} ${item.city} ${item.detail}`}</div>
              </Card>
            </Col>
          ))
        }
        <Col span={6}>
          <Card style={{ height: 150 }}>
            <div className={styles.addArea} onClick={() => {
              setOpenAddForm(true)
            }}>
              <div className={styles.addIcon}><PlusCircleOutlined style={{ fontSize: '32px' }} /></div>
              <div className={styles.addTxt}>添加新地址</div>
            </div>
          </Card>
        </Col>
      </Row>
      <AddressForm open={openAddForm} onCancel={onCancel} onSubmit={onSubmit} initValue={curAddress}/>
    </div>
  );
}


export default AddressCardSection;