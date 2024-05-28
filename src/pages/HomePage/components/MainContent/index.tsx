import ProductSection from '@/pages/HomePage/components/ProductSection/ProductSection';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '@/store/modules/product';
import { Empty } from 'antd';

const MainContent = () => {
  const dispatch = useDispatch();
  const types:API.ProductTypeVO[] = useSelector((state: any) => state.product.types);

  //获取产品信息
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProducts());
  }, []);
  return (
    <div style={{ marginTop: 18 }}>
      {
        types.length > 0 && types.map(item => (
          <ProductSection type={item} pagination={false} emptyPlaceHolder={false}/>
        ))
      }

      {
        types.length == 0 && <Empty/>
      }
    </div>
  );
};

export default MainContent;