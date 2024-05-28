import {Outlet } from 'umi';

import {Layout} from 'antd';
import React from 'react';
import CommonHeader from '@/components/CommonHeader';
import CommonFooter from '@/components/CommonFooter';
import "@/style/reset.less";
import {persistor,store} from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useLocation } from '@@/exports';

const { Content, Footer, Header } = Layout;

export default function BasicLayout() {
  const location = useLocation();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {
          location.pathname === "/login" ? <Outlet/> : <Layout>
            <CommonHeader/>
            <Content style={{width:1230,margin:"0 auto",minHeight:600}}>
              <Outlet />
            </Content>
            <CommonFooter/>
          </Layout>
        }
      </PersistGate>
    </Provider>
  );
}
