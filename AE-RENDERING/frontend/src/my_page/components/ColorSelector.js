import React  from 'react';
import 'antd/dist/antd.css';
import {Select, Tag, Row, Col} from 'antd';
const { Option } = Select;
  
function tagRender(props) {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = event => {
      event.preventDefault();
      event.stopPropagation();
    };
    const colors = ["rgb(255,122,0)", "rgb(255,173,0)","rgb(255,19,0)","rgb(28,135,156)","rgb(255,125,115)","rgb(94,191,204)"]
    return (
      <Tag
        color={colors[value-1]}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ width:50, marginRight: 3 }}
      >
        {label}
      </Tag>
    );
}


class ColorSelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputName: props.inputName,
            value: ["1"]
        }
    }
    handleColorChange= (val) =>{
        const MAX = 1;
        val.length <= MAX && this.setState({ value: val });
    };
    render(){
        if(this.state.inputName== ""){
        return(
            <Select
                showArrow
                tagRender={tagRender}
                style={{ width: 20,height:'100%'}}
                defaultValue={['1']}
                value ={this.state.value}
                onChange={this.handleColorChange}
                >
                <Option style={{ backgroundColor: "rgb(255,122,0)"}} value='1' 
                    >color1</Option>    
                <Option style={{ backgroundColor: "rgb(255,173,0)" }} value='2'
                    disabled={false}>color2</Option>
                <Option style={{ backgroundColor: "rgb(255,19,0)" }} value='3'>color3</Option>
                <Option style={{ backgroundColor: "rgb(28,135,156)" }} value='4'>color4</Option>
                <Option style={{ backgroundColor: "rgb(255,125,115)" }} value='5'>color5</Option>
                <Option style={{ backgroundColor: "rgb(94,191,204)" }} value='6'>color6</Option> 
            </Select>
        )}else{
            return(
                <Row   >
                    <Col span={24} >
                        <Select
                        mode="multiple"
                        showArrow
                        tagRender={tagRender}
                        style={{ width: 100 }}
                        defaultValue={['1']}
                        value ={this.state.value}
                        onChange={this.handleColorChange}
                        >
                        <Option style={{ backgroundColor: "rgb(255,122,0)"}} value='1' 
                            >color1</Option>    
                        <Option style={{ backgroundColor: "rgb(255,173,0)" }} value='2'
                            disabled={false}>color2</Option>
                        <Option style={{ backgroundColor: "rgb(255,19,0)" }} value='3'>color3</Option>
                        <Option style={{ backgroundColor: "rgb(28,135,156)" }} value='4'>color4</Option>
                        <Option style={{ backgroundColor: "rgb(255,125,115)" }} value='5'>color5</Option>
                        <Option style={{ backgroundColor: "rgb(94,191,204)" }} value='6'>color6</Option> 
                        </Select>
                    </Col>
                    <Col span={12}>
                        <label>{this.state.inputName}</label>
                    </Col>
            </Row>
            )
        }}
}

export default ColorSelector;