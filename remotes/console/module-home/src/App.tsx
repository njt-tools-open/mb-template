import { Col, Row } from 'antd';
import './App.css';

const App = () => {
  const themes = Array.from(Array(10), (_v, k) => k + 1);
  return (
    <>
      <div className="App">
        <div style={{ width: '400px', padding: '10px' }}>
          {themes.map(item => {
            return (
              <Row key={item}>
                <Col span={8}>{`--soc-blue-${item}`}</Col>
                <Col
                  span={16}
                  style={{
                    height: '100%',
                    backgroundColor: `var(--soc-blue-${item})`,
                  }}
                >
                  &nbsp;
                </Col>
              </Row>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
