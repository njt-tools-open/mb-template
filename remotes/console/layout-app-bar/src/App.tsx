import { useTranslation } from 'react-i18next';

import { Space } from 'antd';

import LangItem from './components/lang';
import UserItem from './components/user';

import './App.css';

const App = () => {
  const { t } = useTranslation();
  return (
    <div className="App">
      <span className="app-bar-item">{t('CONSOLE')}</span>
      <div className="app-bar-item"></div>
      <div className="app-bar-item layout-right">
        <Space size="middle">
          <div className="item-tab">
            <UserItem />
          </div>
          <div className="item-tab">
            <LangItem />
          </div>
        </Space>
      </div>
    </div>
  );
};

export default App;
