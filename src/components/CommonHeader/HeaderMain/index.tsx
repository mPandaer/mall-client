import styles from './style.less';
import { Avatar, Input, Menu, message } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from '@@/exports';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTypes, setSearchKeyWord } from '@/store/modules/product';


const {Search} = Input;
const HeaderMain = () => {
  const types:API.ProductTypeVO[] = useSelector((state:any) => state.product.types);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = (key:string) => {
    // dispatch(setSearchKeyWord(key))
    navigate(`/product/all/${key}?t=${Math.random()}`)
  }

  useEffect(()=> {
    // @ts-ignore
    dispatch(fetchTypes())
  },[])










  return (
    <div className={styles.headerMain}>
      {/*商城Logo*/}
      <div className={styles.headerLogo}>
        <Avatar size={64} shape={"square"}
                src={"https://cdn.cnbj1.fds.api.mi-img.com/mi.com-assets/shop/img/logo-mi2.png"}
                onClick={() => navigate("/")}
        />
      </div>

      <div className={styles.headerNav}>
        <Menu mode="horizontal" className={styles.navList}>
          {
            types.map(item => {
              return (
                <Menu.Item className={styles.navItem} onClick={() => {navigate(`/product/list/${item.typeId}`)}}>
                  <span>{item.typeName}</span>
                </Menu.Item>
              );
            })
          }
        </Menu>
      </div>
      <div className={styles.headerSearch}>
        <Search allowClear className={styles.search} size={"large"} onSearch={async (value) => {
          handleSearch(value)
        }}/>
      </div>
    </div>
  );
}

export default HeaderMain;