import { Link, useNavigate } from '@@/exports';
import { Badge, Button, Dropdown, MenuProps, message, Space } from 'antd';
import { DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styles from './style.less';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '@/store/modules/user';


const HeaderTop = () => {
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleExit = async () => {
    dispatch(setCurrentUser({}));
    await message.success('退出成功');
  };

  const dropdownItem: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/user">个人中心</Link>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={handleExit}>退出登录</div>
      ),
    },
  ];
  return (
    <div className={styles.headerTop}>
      <div className={styles.topRight}>
        {
          !currentUser.userId &&
          <>
            <Link to={'/login'} className={styles.link}>登录</Link>
            <Link to={'/login'} className={styles.link}>注册</Link>
          </>
        }

        {
          currentUser.userId &&
          <>
            <Dropdown menu={{ items: dropdownItem }} className={styles.link}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {currentUser.username}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </>
        }

        <span className={styles.cart} onMouseEnter={() => {
        }} onClick={() => {
          navigate('/cart');
        }}>
              <Badge count={cartItems.length}>
                <ShoppingCartOutlined className={styles.cartIcon} />
                <Button type={'link'} className={styles.cartButton}>购物车</Button>
              </Badge>
        </span>
      </div>
    </div>
  );
};

export default HeaderTop;