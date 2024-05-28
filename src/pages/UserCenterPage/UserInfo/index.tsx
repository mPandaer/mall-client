import styles from './style.less';
import { Button, DatePicker, Descriptions, DescriptionsProps, Input, message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '@/store/modules/user';
import { updateUser } from '@/services/user/User';


const UserInfo = () => {
  const [editable, setEditable] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleUpdateUserInfo = async () => {
    setEditable(false);
    const resp = await updateUser({
      userId: currentUser.userId,
      username: editData.username ? editData.username : currentUser.username,
      email: editData.email ? editData.email : currentUser.email,
    });
    if (resp.message === 'Success') {
      dispatch(setCurrentUser({
        ...currentUser,
        email: editData.email ? editData.email : currentUser.email,
        username: editData.username ? editData.username : currentUser.username,
      }));
      message.success("更新成功")
    }else {
      message.success(`请求失败: ${resp.message}`)
    }


  };


  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户姓名',
      children: <Input placeholder="用户姓名" defaultValue={currentUser.username} disabled={!editable}
                       onChange={(e) => {
                         setEditData({ ...editData, username: e.target.value });
                       }} />,
    },
    {
      key: '4',
      label: '电子邮件',
      children: <Input placeholder="邮箱" defaultValue={currentUser.email} disabled={!editable} onChange={(e) => {
        setEditData({ ...editData, email: e.target.value });
      }} />,
    },
  ];

  return (
    <div className={styles.userInfo}>
      <Descriptions title="个人信息" items={items} column={1} />
      <div className={styles.editButton}>
        {
          !editable && <Button size={'large'} type={'primary'} style={{ marginRight: '16px' }}
                               onClick={() => setEditable(true)}>编辑信息</Button>
        }
        {editable && <Button size={'large'} type={'primary'} onClick={() => {
          handleUpdateUserInfo();
        }}>确认</Button>}
      </div>
    </div>
  );
};


export default UserInfo;