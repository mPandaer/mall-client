import NavBar from '@/pages/HomePage/components/NavBar';
import HomeCarousel from '@/pages/HomePage/components/HomeCarousel';
import styles from "./style.less";
import { Layout } from 'antd';
import MainContent from '@/pages/HomePage/components/MainContent';

const {Sider ,Content} = Layout;

const HomePage = () => {
  return (
    <div>

      {/*导航区*/}
      <Layout>
        <Sider>
          <NavBar/>
        </Sider>
        <Content>
          <HomeCarousel/>
        </Content>
      </Layout>


      <MainContent/>
    </div>

  );
}


export default HomePage;