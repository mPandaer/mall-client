import style from './style.less';
import font from '@/style/font.css';
import React from 'react';
import { Layout } from 'antd';

const {Footer} = Layout

const CommonFooter = () => {
  return (
    <Footer>
      <div className={style.footerTop}>
        <ul className={style.topList}>
          <li className={style.topItem}>
            <em className={font.iconfont}>&#xe6ae;</em>
            <span className={style.desc}>预约维修服务</span>
          </li>
          <li className={style.topItem}>
            <em className={font.iconfont}>&#xe67d;</em>
            <span className={style.desc}>7天无理由退货</span>

          </li>
          <li className={style.topItem}>
            <em className={font.iconfont}>&#xe66d;</em>
            <span className={style.desc}>15天免费换货</span>
          </li>
          <li className={style.topItem}>
            <em className={font.iconfont}>&#xe681;</em>
            <span className={style.desc}>满69包邮</span>

          </li>
          <li className={style.topItem}>
            <em className={font.iconfont}>&#xe790;</em>
            <span className={style.desc}>1100余家售后网点</span>
          </li>
        </ul>
      </div>
      <div className={style.txt}>
        <span>在线鞋城 ©{new Date().getFullYear()} Created by Ant UED</span>
      </div>

    </Footer>
  );
};



export default CommonFooter;