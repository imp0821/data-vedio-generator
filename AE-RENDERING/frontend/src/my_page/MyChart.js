import React from 'react'
import 'antd/dist/antd.css';
import { Slider, InputNumber, Row, Col } from 'antd';

class IntegerStep extends React.Component {
    state = {
      inputValue: 1,
    };
  
    onChange = value => {
      this.setState({
        inputValue: value,
      });
    };
  
    render() {
      const { inputValue } = this.state;
      return (
        <Row>
          <Col span={12}>
            <Slider
              min={1}
              max={20}
              onChange={this.onChange}
              value={typeof inputValue === 'number' ? inputValue : 0}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={20}
              style={{ margin: '0 16px' }}
              value={inputValue}
              onChange={this.onChange}
            />
          </Col>
        </Row>
      );
    }
  }

class MyChart extends React.Component{
    render(){
        return(
            <div className="inner">
                <IntegerStep></IntegerStep>
            </div>
            
        )
    }
}

export default MyChart;