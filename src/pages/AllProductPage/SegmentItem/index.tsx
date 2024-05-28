import styles from './style.less';
import { Segmented } from 'antd';
import { ReactNode, useEffect, useState } from 'react';

interface ItemType {
  label:ReactNode|string|undefined;
  value:string|number|undefined;
}

type SegmentItemProps<ItemType> = {
  title:string,
  data:ItemType[],
  onChange: (item: string) => void;
}


// @ts-ignore
const SegmentItem =  ({title,data,onChange}:SegmentItemProps<ItemType>) => {
  const [extData, setExtData] = useState<ItemType[]>(data);

  useEffect(() => {
    setExtData([{label:"不限",value:""},...data]);
  }, [data]);

  return (
    <div className={styles.productSegment}>
      <div className={styles.title}>{title}</div>
      <Segmented<ItemType>
        options={extData}
        defaultValue={{label:"不限",value:""}}
        onChange={(value) => {
          console.log(value); // string
          // @ts-ignore
          onChange(value);
        }}
        className={styles.realSegment}
        size={"large"}
      />
    </div>
  );

}



export default SegmentItem;