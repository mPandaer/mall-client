
import styles from "./style.less";
import { Avatar, Button, Card, Divider, Empty, message, Pagination } from 'antd';
import { useNavigate, useParams } from '@@/exports';
import { useEffect, useState } from 'react';
import { flowOrderStatus, getOrderDetailById, getOrderListByStatus, requestRefund } from '@/services/order/Order';
import { useSelector } from 'react-redux';

interface OderDetailMap {
  key:string,
  value:API.OrderDetailVO[]
}

const Order = () => {
  // const statusItems= [
  //   {
  //     label:"待发货",
  //     value:"0"
  //   },
  //   {
  //     label:"运输中",
  //     value:"1"
  //   },
  //   {
  //     label:"交易完成",
  //     value:"2"
  //   },
  //   {
  //     label:"申请退款",
  //     value:"3"
  //   },
  //   {
  //     label:"已退货",
  //     value:"4"
  //   },
  //   {
  //     label:"已取消",
  //     value:"5"
  //   },
  // ]
  const statusItems = useSelector((state:any) => state.order.status);
  const { status } = useParams();
  const [orderList,setOrderList] = useState<API.OrderVO[]>([]);
  const [orderDetailList,setOrderDetailList] = useState<OderDetailMap[]>([])
  const navigate = useNavigate();
  const fetchOrder = async () => {
    if (status) {
      const resp = await getOrderListByStatus(+status)
      if (resp.message === "Success") {
        setOrderList(resp.data ?? []);
      }else {
        message.warning(`请求失败: ${resp.message}`)
      }
    }
  }
  useEffect(() => {
    fetchOrder();


  }, [status]);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      const detailList = await Promise.all(orderList.map(async (item) => {
        const detail = await getOrderDetailById({orderId: item.orderId+""})
        return {key:item.orderId+"",value:detail.data ?? []};
      }))
      setOrderDetailList(detailList);
    }
    fetchOrderDetail();
  }, [orderList]);

  const getDetail = (orderId:string) => {
    if (orderDetailList.length > 0) {
      const oderDetailMap = orderDetailList.filter(detail => detail.key === orderId)[0];
      return oderDetailMap.value[0];
    }

  }

  const handleToOrderDetail = (id:string) => {
    navigate(`/user/order/detail/${id}`)
  }

  //处理确认收货
  const handleConfirmReceipt = async (item:API.OrderVO) => {
    const resp = await flowOrderStatus(item.orderId + "",item.orderStatus ?? -1)
    if (resp.message === "Success") {
      message.success("确认收货成功")
      await fetchOrder()
    }else {
      message.error("确认收货失败")
    }
  }

  const handleRequestRefund = async (item:API.OrderVO) => {
    const resp = await requestRefund(item.orderId + "")
    if (resp.message === "Success") {
      message.success("申请退款成功")
      await fetchOrder()
    }else {
      message.error("申请退款失败: " + resp.message)
    }
  }




  // @ts-ignore
  // @ts-ignore
  return (
    <div className={styles.order}>

      {
        orderList.length > 0 && orderDetailList.length > 0 && <>
          <div className={styles.title}>我的订单</div>
          <div className={styles.orderList}>
            {
              orderList.map(item => (
                <div className={styles.orderItem}>
                  <Card hoverable bordered={true}>
                    <div className={styles.orderTop}>
                      <div
                        className={styles.orderStatus}>{statusItems.filter((item:any) => item.value === status)[0].label}</div>
                      <div className={styles.orderInfo}>
                        <div className={styles.orderTime}>{item.createTime}</div>
                        <div className={styles.orderId}>订单号: {item.orderId}</div>
                        <div className={styles.orderPayPrice}>应付金额: <span
                          className={styles.priceNumber}>{item.totalAmount}</span>元
                        </div>
                      </div>
                    </div>
                    <Divider />
                    <div className={styles.orderBottom}>

                      <div className={styles.productInfo}>
                        <div className={styles.productImg}>
                          <Avatar size={88} shape={'square'}
                            // @ts-ignore
                                  src={getDetail(item.orderId + "").product.detailImgUrls.split(",")[0]} />
                        </div>
                        <div className={styles.desc}>
                          <p>{getDetail(`${item.orderId}`)?.product?.name}-{getDetail(`${item.orderId}`)?.product?.size?.sizeName}码</p>
                          <p>{getDetail(`${item.orderId}`)?.product?.price}元x{getDetail(`${item.orderId}`)?.quantity}</p>
                        </div>
                      </div>


                      <div className={styles.optionButton}>

                        {
                          status === "0" &&  <Button className={styles.button} onClick={() => {handleRequestRefund(item)}}>申请退款</Button>
                        }
                        {
                          status === "1" &&  <Button className={styles.button} onClick={() => {handleConfirmReceipt(item)}}>确认收货</Button>
                        }

                        <Button  className={styles.optionButton} onClick={() => {handleToOrderDetail(item.orderId+"")}}>订单详情</Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))
            }


          </div>
          <div className={styles.page}>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </>
      }

      {
        orderList.length === 0 && <Empty/>
      }

    </div>
  );
};


export default Order;