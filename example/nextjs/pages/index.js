import React from 'react';
import Row from '../actbase/Layout/Row';
import Col from '../actbase/Layout/Col';
import Div from '../actbase/web/Div';
import { ABContext } from '../actbase/App/utils';
import Form from "../actbase/Form";

const Home = () => {
  const a = React.useContext(ABContext);
  return (
    <Div>
      <Form>

      </Form>
      {/*<Row gutter={10}>*/}
      {/*  /!*<Col span={10}>*!/*/}
      {/*  /!*  <Div style={{ backgroundColor: '#F00' }}>a</Div>*!/*/}
      {/*  /!*</Col>*!/*/}
      {/*  /!*<Col span={10}>*!/*/}
      {/*  /!*  <Div style={{ backgroundColor: '#F00' }}>a</Div>*!/*/}
      {/*  /!*</Col>*!/*/}
      {/*</Row>*/}
    </Div>
  );
};

export default Home;
