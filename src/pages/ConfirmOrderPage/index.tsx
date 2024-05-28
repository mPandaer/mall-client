import styles from "./style.less";
import { Button, Card, Col, Descriptions, DescriptionsProps, Divider, message, Row, Table, TableProps } from 'antd';

import AddressCardSection from '@/components/AddressCardSection';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrderProductItem, OrderProductItem } from '@/store/modules/order';
import { useNavigate } from '@@/exports';
import { clearCart } from '@/store/modules/cart';
import { addOrder } from '@/services/order/Order';

const ConfirmOrderPage = () => {
  const dataItems:OrderProductItem[] = useSelector((state:any) => state.order.productItem)
  const currentUser = useSelector((state:any) => state.user.currentUser)
  const selectedAddress = useSelector((state:any) => state.address.selectAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const columns: TableProps<any>['columns'] = [
    {
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      dataIndex: 'productSize',
      key: 'productSize',
      render: (text,record) => `${record.productSize.sizeName}码`
    },
    {
      dataIndex: 'detailPrice',
      key: 'detailPrice',
      render: (text,record) => `${record.price}元 x ${record.productNum}`
    },
    {
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text,record) => `${record.price * record.productNum}元`
    },
  ];
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '商品件数',
      children: `${dataItems.reduce((acc:number, item:OrderProductItem) => acc + item.productNum, 0)}件`,
    },
    {
      key: '2',
      label: '商品总价',
      children: `${dataItems.reduce((acc:number,item:OrderProductItem) => acc + item.productNum * item.price,0)}元`,
    },
    {
      key: '3',
      label: '应付总额',
      children: `${dataItems.reduce((acc:number,item:OrderProductItem) => acc + item.productNum * item.price,0)}元`,
    }
  ];

  const handleClearOrderItem = () => {
    // @ts-ignore
    dispatch(clearOrderProductItem())
    navigate("/cart")
  }
  const handleSubmitOrder = async () => {
    //todo 发起一个网络请求 添加订单
    const totalPrice = dataItems.reduce((acc, item) => acc + item.productNum * item.price,0);
    const details = dataItems.map(item => (
      {
        productId: item.productId,
        quantity:item.productNum,
        unitPrice:item.price,
        totalPrice:item.price * item.productNum
      }
    ));
    const resp = await addOrder({
      /** 用户ID */
      userId: currentUser.userId,
      /** 地址ID */
      addressId: selectedAddress.addressId,
      /** 应付金额 */
      totalAmount: totalPrice,
      /** 订单明细 */
      details: details
    })
    if (resp.message === "Success") {
      // @ts-ignore
      dispatch(clearOrderProductItem())
      message.success("提交成功")
      // @ts-ignore
      dispatch(clearCart())
      navigate("/user")
    }else {
      message.error(`下单失败: ${resp.message}`)
    }

  }
  return (
    <>
      <h2 className={styles.pageTitle}>确认订单</h2>
      <div className={styles.addressArea}>
        <Divider orientation="left">收货地址</Divider>
        <AddressCardSection supportDelete={false}/>
      </div>

      <div className={styles.productList}>
          <div className={styles.productInfo}>
            <Divider orientation="left">商品</Divider>
            <Table showHeader={false} columns={columns} dataSource={dataItems} pagination={false}/>
          </div>

        <div className={styles.distribution}>
          <span className={styles.distributionTitle}>配送方式</span>
          <span className={styles.distributionDesc}>包邮</span>
        </div>
      </div>

      <div className={styles.cost}>
        <Divider orientation="left">费用</Divider>
        <div className={styles.costDesc}>
          <Descriptions items={items}  column={1} className={styles.desc}/>
        </div>
      </div>

      <div className={styles.optionArea}>
        <Divider></Divider>
        <div className={styles.optionButton}>
            <Button size={"large"} className={styles.button} onClick={handleClearOrderItem}>返回购物车</Button>
            <Button size={"large"} className={`${styles.button} ${styles.submit}`} onClick={handleSubmitOrder}>提交订单</Button>
        </div>
      </div>
    </>

  );
}


export default ConfirmOrderPage;