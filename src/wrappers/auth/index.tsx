import { Navigate, Outlet } from 'umi'
import { useSelector } from 'react-redux';

const auth = (props:any) => {
  const currentUser = useSelector((state:any) => state.user.currentUser);
  if (typeof currentUser.userId !== 'undefined') {
    return <Outlet />;
  } else{
    return <Navigate to="/login" />;
  }
};

export default auth;