import { Layout, Menu, MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Outlet } from 'umi';
import { useNavigate } from '@@/exports';
import styles from "./style.less";

const {Sider,Content} = Layout;
type MenuItem = Required<MenuProps>['items'][number];
const UserCenterPage = () => {
  const navigate = useNavigate();
  const items: MenuItem[] = [
    {
      key: 'sub1',
      label: '订单中心',
      icon: <MailOutlined />,
      children: [
        {
          key: '1',
          label: '待发货',
          onClick: () => {navigate("/user/order/0")}
        },
        {
          key: '2',
          label: '运输中',
          onClick: () => {navigate("/user/order/1")}
        },
        {
          key: '3',
          label: '交易完成',
          onClick: () => {navigate("/user/order/2")}
        },
        {
          key: '4',
          label: '申请退货',
          onClick: () => {navigate("/user/order/3")}
        },
        {
          key: '5',
          label: '已退货',
          onClick: () => {navigate("/user/order/4")}
        },
        {
          key: '6',
          label: '已取消',
          onClick: () => {navigate("/user/order/5")}
        },
      ],
    },
    {
      key: 'sub2',
      label: '个人中心',
      icon: <AppstoreOutlined />,
      children: [
        { key: '8', label: '个人信息',onClick: () => {navigate("/user/info")} },
        { key: '9', label: '密码修改',onClick: () => {navigate("/user/reset")} },
        { key: '10', label: '收货地址',onClick: () => {navigate("/user/address")} },
      ],
    },
  ];
  return (
    <div className={styles.userCenter}>
      <Layout>
        <Sider style={{width:"max-content",height:"fit-content"}}>
          <Menu
            style={{backgroundColor:'#f5f5f5' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
          />
        </Sider>
        <Content>
          <Outlet/>
        </Content>
      </Layout>
    </div>

  );
};


export default UserCenterPage;