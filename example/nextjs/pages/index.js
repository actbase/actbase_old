import React from 'react';
import { createGenerateId, createUseStyles, SheetsRegistry } from 'react-jss';
import Button from '@material-ui/core/Button';
import jss from 'jss';

const useStyles = createUseStyles({
  myButton: {
    color: 'green',
    marginLeft: 20,
    '& span': {
      // jss-plugin-nested applies this to a child span
      fontWeight: '600', // jss-plugin-camel-case turns this into 'font-weight'
    },
  },
  myLabel: {
    fontStyle: 'italic',
  },
});

const Home = () => {
  React.useEffect(() => {
    const sheet = jss
      .createStyleSheet(
        {
          // "button" is a rule name; a class gets generated.
          button: {
            width: 100,
            height: 100,
          },
        },
        { meta: 'print' },
      )
      .attach();

    const sheet2 = jss
      .createStyleSheet(
        {
          // "button" is a rule name; a class gets generated.
          button: {
            width: 100,
            height: 100,
          },
        },
        { meta: 'print' },
      )
      .attach();
  }, []);

  const sheets = React.useRef(new SheetsRegistry());
  const generateId = React.useRef(createGenerateId());
  const classes = useStyles();
  return (
    <div>
      <button className={classes.myButton}>
        <span className={classes.myLabel}>aaa</span>
      </button>
      <Button variant="contained" color="primary">
        asdfsf
      </Button>
        <Button variant="contained" color="primary">
            asdfsf
        </Button>
      {/*<Row></Row>*/}
      {/*<Row gutter={10}>*/}
      {/*  /!*<Col span={10}>*!/*/}
      {/*  /!*  <Div style={{ backgroundColor: '#F00' }}>a</Div>*!/*/}
      {/*  /!*</Col>*!/*/}
      {/*  /!*<Col span={10}>*!/*/}
      {/*  /!*  <Div style={{ backgroundColor: '#F00' }}>a</Div>*!/*/}
      {/*  /!*</Col>*!/*/}
      {/*</Row>*/}
    </div>
  );
};

export default Home;
