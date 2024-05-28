import { Card, Col, Divider, Empty, Pagination, Row } from 'antd';
import styles from "./style.less";
import { useNavigate } from '@@/exports';
import { useParams } from 'umi';
import React, { useEffect, useState } from 'react';
import { pageQuery } from '@/services/product/Product';



const {Meta} = Card;


type ProductSectionProps = {
  type:API.ProductTypeVO
  pagination:boolean
  emptyPlaceHolder:boolean
}

const ProductSection = ({type,pagination,emptyPlaceHolder}:ProductSectionProps) => {
  const navigate = useNavigate();
  const [data,setData] = useState<API.ProductVO[]>([]);
  useEffect(() => {
    const fetchDataByType = async () => {
      const resp = await pageQuery({
        currentPage: 1,
        pageSize: 8,
        typeId: type.typeId + ""
      })
      setData(resp.data?.records ?? [])
    }
    fetchDataByType();
  }, [type]);

  return (
    <>

      {
        data.length > 0 && <>
          <Divider orientation="left" style={{ fontWeight: 'bold' }}>{type.typeName}</Divider>
          <Row gutter={[16, 24]}>
            {
              data.map((item) => {
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
          {
            pagination && <div className={styles.page}>
              <Pagination defaultCurrent={1} total={50} />
            </div>
          }

        </>
      }

      {
        emptyPlaceHolder && data.length === 0 && <Empty />
      }
    </>
  );

}

export default ProductSection;