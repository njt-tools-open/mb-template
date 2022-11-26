import { Dropdown, Space } from 'antd';
import { WithLocal } from '../with-local';

const items = [
  {
    key: 'profile',
    label: <WithLocal localKey="USER_PROFILE" />,
  },
  {
    key: 'logout',
    label: <WithLocal localKey="LOGOUT" />,
  },
];

const UserIcon = () => {
  return (
    <div style={{ height: '22px', width: '30px' }}>
      <svg
        style={{ verticalAlign: 'top' }}
        width="100%"
        height="100%"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M486.4 563.2C331.1104 563.2 204.8 436.8896 204.8 281.6S331.1104 0 486.4 0 768 126.3104 768 281.6 641.6896 563.2 486.4 563.2z m0-512C359.3728 51.2 256 154.5728 256 281.6S359.3728 512 486.4 512 716.8 408.6272 716.8 281.6 613.4272 51.2 486.4 51.2zM896 1024h-819.2C34.4576 1024 0 989.5424 0 947.2c0-3.4816 0.7168-86.272 62.72-168.96 36.096-48.128 85.504-86.3744 146.8928-113.6128C284.5696 631.296 377.7024 614.4 486.4 614.4s201.8304 16.896 276.7872 50.2272c61.3888 27.2896 110.7968 65.4848 146.8928 113.6128C972.0832 860.928 972.8 943.7184 972.8 947.2c0 42.3424-34.4576 76.8-76.8 76.8z m-409.6-358.4c-178.5344 0-310.272 48.7936-380.9792 141.1072C52.4288 875.8784 51.2512 946.5856 51.2 947.3024a25.6 25.6 0 0 0 25.6 25.4976h819.2a25.6 25.6 0 0 0 25.6-25.6c0-0.6144-1.1776-71.3216-54.2208-140.4928C796.6208 714.3936 664.8832 665.6 486.4 665.6z"
          fill="#FFFFFF"
        ></path>
      </svg>
    </div>
  );
};

const UserItem = () => {
  const handleClick = ({ key }: any) => {
    switch (key) {
      case 'profile':
        break;
      case 'logout':
        window.consoleSDK.logout();
        break;
      default:
    }
  };
  return (
    <Dropdown menu={{ items, onClick: handleClick }} placement="bottom">
      <Space style={{ height: '100%' }}>
        <UserIcon />
      </Space>
    </Dropdown>
  );
};

export default UserItem;
