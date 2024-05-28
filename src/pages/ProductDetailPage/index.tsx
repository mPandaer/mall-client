import React, { useEffect } from 'react';
import { Button, Carousel, Descriptions, DescriptionsProps, Flex, Image, message, Select } from 'antd';
import styles from "./style.less";
import {useParams} from 'umi';
import { getByProductId } from '@/services/product/Product';
import { useDispatch } from 'react-redux';
import { addCart } from '@/store/modules/cart';


const ProductDetailPage = () => {
  const [product,setProduct] = React.useState<API.ProductVO>({});
  const {productId} = useParams()
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProductById = async () => {
      const resp = await getByProductId(productId ?? "")
      console.log("detail",resp)
      setProduct({
        ...resp.data
      })
    }
    fetchProductById();
  }, []);

  /**
   * 添加购物车
   */
  const handleAddCart = () => {
    dispatch(addCart({
      productId: product.productId,
      productName: product.name,
      productSize:product.size,
      price: product.price,
      productNum: 1
    }))
    message.success("加入成功")
  }

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '商品名字',
      children: product.name,
    },
    {
      key: '2',
      label: '商品价格',
      children: `${product.price}元`,
    },
    {
      key: '3',
      label: '商品颜色',
      children: (product.color?.colorId && <Select options={[{ value: product.color?.colorId, label: product.color?.colorName }]} defaultValue={product.color?.colorId}/>),
    },
    {
      key: '4',
      label: '商品尺码',
      children: (product.size?.sizeId && <Select options={[{ value: product.size?.sizeId, label: product.size?.sizeName }]} defaultValue={product.size?.sizeId}/>),
    },
  ];

  return (
    <div className={styles.detailCarousel}>
      <div className={styles.carousel}>
        <Carousel infinite={false} arrows={true}>
          {
            product.detailImgUrls && product.detailImgUrls.split(",").map(url => (<div className={styles.imageContainer}><Image preview={false} src={url} style={{objectFit:"cover",height:400}}/></div>))
          }
        </Carousel>
      </div>

      <div className={styles.detailDesc}>
        <div>
          <Descriptions title={"商品详情"} column={1} items={items}>
          </Descriptions>
        </div>

        <div className={styles.options}>
          <Button type={"primary"} className={styles.optionsButton} onClick={handleAddCart}>加入购物车</Button>
          <Button type={"primary"} className={styles.optionsButton}>立即购买</Button>
        </div>
      </div>


    </div>
  );
}


export default ProductDetailPage;