import { Button, InputNumber, message, Table, TableProps } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from "./style.less";
import { useDispatch, useSelector } from 'react-redux';
import { CartItem, delCart, setCartItemNum } from '@/store/modules/cart';
import { setOrderProductItem } from '@/store/modules/order';
import { useNavigate } from '@@/exports';

const CartPage = <T extends any>() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelCart = (record:CartItem) => {
    dispatch(delCart(record))
  }
  const columns: TableProps<CartItem>['columns'] = [
    {
      title: '商品名字',
      dataIndex: 'productName',
      key: 'name',
    },
    {
      title: '商品尺码',
      dataIndex: 'size',
      key: 'size',
      render: (_,record,__) => record.productSize?.sizeName
    },
    {
      title: '商品单价',
      dataIndex: 'price',
      key: 'price',
      render: (item) => `${item}元`
    },
    {
      title: '商品数量',
      dataIndex: 'productNum',
      key: 'productNum',
      render: (item,record) => <InputNumber  min={1} max={100} value={item} onChange={(value) => {
        dispatch(setCartItemNum({id:record.productId,num: value}))
      }}/>
    },
    {
      title: '小计',
      dataIndex: 'total',
      key: 'total',
      render: (_,record,__) => `${record.price * record.productNum}`
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      render: (_,record,__) => <DeleteOutlined style={{color:"red"}} onClick={() => handleDelCart(record)} />
    },
  ];
  const dataItems = useSelector((state:any) => state.cart.cartItems);

  const handleConfirmOrder = () => {
    dispatch(setOrderProductItem(dataItems))
    navigate("/confirm/order")
  }

  return (
    <div className={styles.cartPage}>
      <h2>我的购物车</h2>
      <Table<CartItem> columns={columns} dataSource={dataItems}>
      </Table>
      <div className={styles.totalOption}>
        <div className={styles.total}>
          合计: <span className={styles.totalPrice}>{
            dataItems.reduce((total:number, item:CartItem) => total + item.price * item.productNum, 0)
        }元</span>
        </div>
        <div className={styles.option}>
          <Button type={"primary"} size={"large"} onClick={() => handleConfirmOrder()}>结算</Button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;