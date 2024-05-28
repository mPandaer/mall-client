

import { Empty, message, Pagination } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import ProductSection from '@/pages/HomePage/components/ProductSection/ProductSection';
import styles from "./style.less";
import { useParams } from 'umi';
import { pageQuery } from '@/services/product/Product';
import {all3 as allBrand} from "@/services/product/ProductBrand"
import {all2 as allColor} from "@/services/product/ProductColor"
import {all1 as allSize} from "@/services/product/ProductSize"
import {all as allType} from "@/services/product/ProductType"
import { useSelector } from 'react-redux';

const ProductList = () => {
  const types:API.ProductTypeVO[] = useSelector((state:any) => state.product.types);
  const {typeId} = useParams()
  const [type,setType] = useState<API.ProductTypeVO>({});



  useEffect(() => {
    if (typeId) {
      console.log("typeId变化啦")
      setType(types.filter(item => item.typeId === typeId)[0])
      console.log("typeId",typeId);
      console.log("type",type);
    }

  }, [typeId]);






  return (
    <div className={styles.productList}>
      {
        type.typeId &&
        <>
          <ProductSection type={type} pagination={true} emptyPlaceHolder={true}/>
        </>
      }
      {
        !type.typeId && <Empty />
      }

    </div>

  );
}


export default ProductList;