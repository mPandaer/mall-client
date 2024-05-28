import { Carousel, Image } from 'antd';
import styles from "./style.less";
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '416px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  zIndex:0,
};

const HomeCarousel = () => {
  return (
    <div className={styles.carousel}>
      <Carousel arrows infinite={false}>
        <Image preview={false} className={styles.item} src={"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8fbeb7319f6413f0ec0ee2ba1bed0aaa.jpg?thumb=1&w=1839&h=690&f=webp&q=90"}/>
        <Image preview={false} className={styles.item} src={"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8fbeb7319f6413f0ec0ee2ba1bed0aaa.jpg?thumb=1&w=1839&h=690&f=webp&q=90"}/>
      </Carousel>
    </div>

  );
}

export default HomeCarousel;