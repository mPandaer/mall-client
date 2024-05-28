import styles from "./style.less";
import {  Divider, Image, Segmented } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'umi';
import { getOrderById, getOrderDetailById } from '@/services/order/Order';
import { useSelector } from 'react-redux';


const OrderDetailPage = () => {
  const [order, setOrder] = useState<API.OrderVO>({});
  const [details,setDetails] = useState<API.OrderDetailVO[]>([]);
  const {orderId} = useParams()
  const statusItems = useSelector((state:any) => state.order.status);
  useEffect(() => {
    const fetchOrderAndDetail = async () => {
      const orderPromise = getOrderById(orderId ?? "")
      const detailPromise = getOrderDetailById({orderId:orderId ?? ""})

      const orderResp = await orderPromise;
      const detailResp = await detailPromise;
      if (orderResp.message === "Success" && orderResp.data) {
          setOrder(orderResp.data)
      }
      if (detailResp.message === "Success" && detailResp.data) {
        setDetails(detailResp.data)
      }
    }

    fetchOrderAndDetail();
  }, [orderId]);
  const totalPrice = () => {
    return details.reduce((acc,detail)=> acc + (detail.quantity ?? 0) * (detail.product?.price ?? 0),0)
  }


  return (
    <div className={styles.orderDetail}>
      <div className={styles.title}>
        订单详情
      </div>
      <div>
        订单号 {order.orderId}
      </div>
      <Divider/>

      <div className={styles.status}>
        <div className={styles.statusTitle}>{
          statusItems.find((item:any) => item.value === order.orderStatus+"")?.label
        }</div>
        <div className={styles.statusSegment}>
          {
            statusItems.map((status:any) => {
              return (
                <div className={status.value === order.orderStatus + "" ? `${styles.statusSegmentItem} ${styles.active}` : styles.statusSegmentItem} key={status.value}>
                  {status.label}
                </div>
              );
            })
          }
        </div>
      </div>
      <Divider/>
      <div className={styles.productList}>
        {
          details.length > 0 && details.map(detail => (
            (
              <div className={styles.productItem}>
                <div className={styles.productImg}>
                  <Image preview={false}
                         src={detail.product?.detailImgUrls?.split(",")[0]}></Image>
                </div>
                <div className={styles.productName}>
                  {detail.product?.name}-{detail.product?.size?.sizeName}码
                </div>
                <div className={styles.productPrice}>
                  {detail.product?.price}元x{detail.quantity}
                </div>
              </div>
            )
          ))
        }
      </div>
      <Divider />
      <div className={styles.addressInfo}>
        <div className={styles.addressTitle}>收货信息</div>
        <div className={styles.info}>姓名: {order.address?.recipientName}</div>
        <div className={styles.info}>联系电话: {order.address?.recipientPhone}</div>
        <div className={styles.info}>收货地址: {order.address?.province} {order.address?.city} {order.address?.address}</div>
      </div>
      <Divider />
      <div className={styles.orderSummary}>
        <div className={styles.summaryInfo}>商品总价: {totalPrice()}元</div>
        <div className={styles.summaryInfo}>运费: 0元</div>
        <div className={styles.summaryInfo}>应付金额: <span className={styles.summaryPrice}>{totalPrice()}</span>元</div>
      </div>

    </div>
  );
}

export default OrderDetailPage;