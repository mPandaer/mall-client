import React from 'react';
import { Layout } from 'antd';
import styles from './style.less';
import HeaderTop from '@/components/CommonHeader/HeaderTop';
import HeaderMain from '@/components/CommonHeader/HeaderMain';


const { Header } = Layout;
// 根 CommonHeader 组件
const CommonHeader: React.FC = () => {
  return (
    <Header className={styles.header}>
      <HeaderTop />
      <HeaderMain />
    </Header>
  );
};

export default CommonHeader;
