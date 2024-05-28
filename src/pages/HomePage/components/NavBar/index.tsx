import styles from './style.less';
import { RightOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import '@/style/reset.less';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '@/store/modules/product';

const fakeProductBrands: API.ProductBrandVO[] = [
  {
    brandId: 1,
    brandName: "耐克",
    isEnable: 1,
    createTime: "2022-05-01",
    brandLogoUrl: "https://example.com/logo1.jpg"
  },
  {
    brandId: 2,
    brandName: "阿迪达斯",
    isEnable: 1,
    createTime: "2022-05-02",
    brandLogoUrl: "https://example.com/logo2.jpg"
  },
  {
    brandId: 3,
    brandName: "安踏",
    isEnable: 1,
    createTime: "2022-05-03",
    brandLogoUrl: "https://example.com/logo3.jpg"
  },
  {
    brandId: 4,
    brandName: "李宁",
    isEnable: 1,
    createTime: "2022-05-04",
    brandLogoUrl: "https://example.com/logo4.jpg"
  },
  {
    brandId: 5,
    brandName: "匹克",
    isEnable: 1,
    createTime: "2022-05-05",
    brandLogoUrl: "https://example.com/logo5.jpg"
  },
  {
    brandId: 6,
    brandName: "乔丹",
    isEnable: 1,
    createTime: "2022-05-06",
    brandLogoUrl: "https://example.com/logo6.jpg"
  },
  {
    brandId: 7,
    brandName: "匡威",
    isEnable: 1,
    createTime: "2022-05-07",
    brandLogoUrl: "https://example.com/logo7.jpg"
  },
  {
    brandId: 8,
    brandName: "特步",
    isEnable: 1,
    createTime: "2022-05-08",
    brandLogoUrl: "https://example.com/logo8.jpg"
  }
];
const fakeProductTypes: API.ProductTypeVO[] = [
  {
    typeId: 1,
    typeName: "篮球鞋",
    isEnable: 1,
    createTime: "2022-05-01"
  },
  {
    typeId: 2,
    typeName: "跑鞋",
    isEnable: 1,
    createTime: "2022-05-02"
  },
  {
    typeId: 3,
    typeName: "羽毛球鞋",
    isEnable: 1,
    createTime: "2022-05-03"
  },
  {
    typeId: 4,
    typeName: "运动鞋",
    isEnable: 1,
    createTime: "2022-05-04"
  },
  {
    typeId: 5,
    typeName: "休闲鞋",
    isEnable: 1,
    createTime: "2022-05-05"
  },
  {
    typeId: 6,
    typeName: "职业鞋",
    isEnable: 1,
    createTime: "2022-05-06"
  }
];

const NavBar = () => {
  const brands:API.ProductBrandVO[] = useSelector((state:any) => state.product.brands);
  const types:API.ProductTypeVO[] = useSelector((state:any) => state.product.types);
  const dispatch = useDispatch();

  const [displayChild, setDisplayChild] = useState<boolean>(false);
  const timerRef = useRef<number>(null)

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchBrands())

  }, []);


  return (
    <div className={styles.navBar}>
      {/*一级菜单*/}
      <ul className={styles.navList}>
        {
          brands.map(item => {
            return (
              <li
                className={styles.navItem}
                onMouseEnter={() => {
                  if (timerRef.current) clearTimeout(timerRef.current);
                  if (!displayChild) {
                    setDisplayChild(true);
                  }
                }}
                onMouseLeave={() => {
                  // @ts-ignore
                  timerRef.current = setTimeout(() => {
                    setDisplayChild(false);
                  },80)
                }}
              >{item.brandName}<RightOutlined className={styles.rightIcon} /></li>
            );
          })
        }
      </ul>

      {/*二级菜单*/}
      {
        displayChild && <ul className={styles.childList} onMouseLeave={() => setDisplayChild(false)} onMouseEnter={() => { // @ts-ignore
          clearTimeout(timerRef.current)}}>
          {
            types.map(item => {
              return (
                <li className={styles.childItem}>
                  {item.typeName}
                </li>
              );
            })
          }
        </ul>
      }

    </div>
  );

};


export default NavBar;