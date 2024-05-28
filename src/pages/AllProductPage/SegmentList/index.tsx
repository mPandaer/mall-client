
import styles from "./style.less";
import SegmentItem from '@/pages/AllProductPage/SegmentItem';
import { useEffect, useState } from 'react';

export interface selectSegmentIdList {
  sizeId:string;
  typeId:string;
  colorId:string;
  brandId:string;
}

interface SegmentListProps {
  sizeList: API.ProductSizeVO[];
  brandList: API.ProductBrandVO[];
  typeList: API.ProductTypeVO[];
  colorList: API.ProductColorVO[];
  onChange: (value:selectSegmentIdList) => void
}

const SegmentList = ({sizeList,brandList,typeList,colorList,onChange}:SegmentListProps) => {
  const sizeData = sizeList.map(item => ({label:item.sizeName,value:item.sizeId}))
  const brandData = brandList.map(item => ({label:item.brandName,value:item.brandId}))
  const typeData = typeList.map(item => ({label:item.typeName,value:item.typeId}))
  const colorData = colorList.map(item => ({label:item.colorName,value:item.colorId}))

  const [sizeId,setSizeId] = useState<string>("");
  const [typeId,setTypeId] = useState<string>("");
  const [colorId,setColorId] = useState<string>("");
  const [brandId,setBrandId] = useState<string>("");

  useEffect(() => {
    //向上传递数据
    onChange({
      sizeId:sizeId,
      typeId:typeId,
      colorId:colorId,
      brandId:brandId
    })

  }, [sizeId,typeId,colorId,brandId]);


  return (
    <div className={styles.segmentList}>
        <SegmentItem title={"尺码"} data={sizeData} onChange={async (value:string) => {
          setSizeId(value)
        }} />
      <SegmentItem title={"品牌"} data={brandData} onChange={async (value) => {
        setBrandId(value)
      }} />
      <SegmentItem title={"类型"} data={typeData} onChange={async (value) => {
        setTypeId(value)
      }} />
      <SegmentItem title={"颜色"} data={colorData} onChange={async (value) => {
        setColorId(value)
      }} />
    </div>
  );

}

export default SegmentList;