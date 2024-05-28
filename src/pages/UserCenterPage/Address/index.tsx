import AddressCardSection from '@/components/AddressCardSection';

import styles from "./style.less";
import { Divider } from 'antd';

const Address = () => {
  return (
    <div className={styles.address}>
      <Divider orientation="left"><span style={{fontWeight:'bold'}}>收货地址</span></Divider>
      <AddressCardSection supportDelete={true}/>
    </div>
  );
};


export default Address;