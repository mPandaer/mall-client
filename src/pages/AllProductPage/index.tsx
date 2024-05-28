import { Card, Col, Empty, message, Pagination, Row } from 'antd';
import styles from './style.less';
import { useLocation, useNavigate, useParams } from '@@/exports';
import React, { useEffect, useState } from 'react';
import SegmentList, { selectSegmentIdList } from '@/pages/AllProductPage/SegmentList';
import { pageQuery } from '@/services/product/Product';
import { all as allType } from '@/services/product/ProductType';
import { all1 as allSize } from '@/services/product/ProductSize';
import { all3 as allBrand } from '@/services/product/ProductBrand';
import { all2 as allColor } from '@/services/product/ProductColor';
import { useSelector } from 'react-redux';

const { Meta } = Card;

const AllProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<API.ProductVO[]>([]);
  const {name} = useParams();
  const [sizeList, setSizeList] = useState<API.ProductSizeVO[]>([]);
  const [typeList, setTypeList] = useState<API.ProductTypeVO[]>([]);
  const [brandList, setBrandList] = useState<API.ProductBrandVO[]>([]);
  const [colorList, setColorList] = useState<API.ProductColorVO[]>([]);


  //获取多级查询的分类条件
  useEffect(() => {
    const fetchAllSegment = async () => {
      const type = allType();
      const size = allSize();
      const brand = allBrand();
      const color = allColor();
      const typeResp = await type;
      const sizeResp = await size;
      const brandResp = await brand;
      const colorResp = await color;
      setTypeList(typeResp.data ?? []);
      setSizeList(sizeResp.data ?? []);
      setColorList(colorResp.data ?? []);
      setBrandList(brandResp.data ?? []);
    };
    fetchAllSegment();
  }, []);


  //选择分类后,发起搜索
  const handleChangeSegment = async (value: selectSegmentIdList) => {
    const resp = await pageQuery({
      currentPage: 1,
      pageSize: 10,
      brandId: value.brandId,
      typeId: value.typeId,
      colorId: value.colorId,
      sizeId: value.sizeId,
      name:name
    });
    setProducts(resp.data?.records ?? []);
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await pageQuery({
        currentPage: 1,
        pageSize: 10,
        name:name
      });
    }
    fetchData()

  }, [name]);


  return (


    <div className={styles.productList}>
      <SegmentList sizeList={sizeList} typeList={typeList} brandList={brandList} colorList={colorList}
                   onChange={handleChangeSegment} />
      {
        products.length > 0 && <>
          <Row gutter={[16, 24]}>
            {
              products.map((item) => {
                return (
                  <Col className="gutter-row" span={6}>
                    <Card
                      hoverable
                      onClick={() => {
                        navigate(`/product/detail/${item.productId}`);
                      }}
                      style={{ width: 240, height: 240 }}
                      cover={<img alt="example" height={120} src={item.detailImgUrls?.split(',')[0]} />}
                    >
                      <Meta title={item.name} description={`${item.price}元`} />
                    </Card>
                  </Col>
                );
              })
            }
          </Row>

          <div className={styles.page}>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </>
      }

      {
        products.length === 0 && <Empty />
      }

    </div>

  );

};

export default AllProductPage;