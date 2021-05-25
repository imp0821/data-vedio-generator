import React from 'react';
import 'antd/dist/antd.css';
import { Slider, InputNumber, Row, Col } from 'antd';
import {ParaContext} from './context/para-context'

class SlideSelect extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          inputMin:0,
          inputMax: props.inputMax,
          inputValue: 10,
          inputName: props.inputName
      }
  }
  handleChange = value => {
    this.setState({
      inputValue: value,
    });
  };

  render() {
    const { inputMin, inputMax, inputValue } = this.state;
    return (
      <Row>
        <Col span={8}>
            <label>{this.state.inputName}</label>
        </Col>
        <Col span={8}>
          <ParaContext.Consumer>
            {({toggleParas})=>(
              <Slider
              min={inputMin}
              max={inputMax}  
              onChange = {this.handleChange}
              onAfterChange = {()=>toggleParas.bind(this)(this.state.inputValue,this.state.inputName)}
              // onChange={toggleParas.bind(this)}
              // value={typeof inputValue === 'number' ? inputValue : 0}
            />
            )}
          </ParaContext.Consumer>
        </Col>
        <Col span={2}>
          <InputNumber
            min={inputMin}
            max={inputMax}
            style={{ width:60, margin: '0 16px' }}
            value={inputValue}
            onChange={this.handleChange}
          />
        </Col>
      </Row>
    );
  }
}

export default SlideSelect;