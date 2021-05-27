import React, { useContext, useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { Table, Popconfirm, Form, InputNumber, Select, Tooltip,Upload,message} from 'antd';
import {DiffTwoTone,SaveTwoTone,DeleteTwoTone,CloudTwoTone,CloseCircleTwoTone,PlusCircleTwoTone} from '@ant-design/icons'
import Papa from 'papaparse'; // 解析cvs插件 市面上使用较多的
import jschardet from 'jschardet'; // 编码识别
const { Option } = Select;
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  type,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      type === "input"?
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
      :
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
      <Select
        ref={inputRef} onChange={save}>
        <Option style={{ backgroundColor: "rgb(255,122,0)"}} value='1' >color1</Option>    
        <Option style={{ backgroundColor: "rgb(255,173,0)" }} value='2'>color2</Option>
        <Option style={{ backgroundColor: "rgb(255,19,0)" }} value='3'>color3</Option>
        <Option style={{ backgroundColor: "rgb(28,135,156)" }} value='4'>color4</Option>
        <Option style={{ backgroundColor: "rgb(255,125,115)" }} value='5'>color5</Option>
        <Option style={{ backgroundColor: "rgb(94,191,204)" }} value='6'>color6</Option> 
      </Select>
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const oned_generateData = (data)=>{
  
  let basic_data = []
  const data_len = data.length-1
  for(let i=1;i<=data_len;i++){
    let tmp = {}
    tmp["key"] = i-1
    tmp["dataId"] = "data"+(i-1)
    tmp["data"] = parseInt(data[i][0])
    tmp["color"] = Math.ceil(Math.random()*5).toString()
    basic_data.push(tmp)
  }
  
  return basic_data
}

const generateData = (num, data=[])=>{
  
  let basic_data = []
  if(data.length === 0){
    for(let i=0;i<2;i++){
      let tmp = {}
      tmp["key"] = i
      tmp["dataId"] = "data"+i
      for(let k=1;k<=num;k++){
        let key1 = "type"+k
        let key2 = "color"+k
        tmp[key1] = Math.ceil(Math.random()*10)*10
        tmp[key2] = '1'
      }
      basic_data.push(tmp)
    }
  }else{
    //console.log(data)
    const data_len = data.length-1
    for(let i=1;i<=data_len;i++){
      let tmp = {}
      tmp["key"] = i-1
      tmp["dataId"] = "data"+(i-1)
      for(let k=1;k<=num;k++){
        let key1 = "type"+k
        let key2 = "color"+k
        tmp[key1] = parseInt(data[i][k-1])
        tmp[key2] = k.toString()
      }
      basic_data.push(tmp)
    }
  }
  return basic_data
}

const generateCol = (num)=>{
  let basic_columns = []
  basic_columns.push({title:'dataIndex',dataIndex:'dataId',width:100})
  for(let i=1;i<=num;i++){
    let tmp1 = {title: `type${i}`,dataIndex: `type${i}`,editable: true,type:'input',width:120}
    let tmp2 = {title: `color${i}`,dataIndex: `color${i}`,editable:true,type:'select', width:120}
    basic_columns.push(tmp1)
    basic_columns.push(tmp2)
  }
  return basic_columns
}

const checkEncoding = (base64Str) => {
  //这种方式得到的是一种二进制串
  const str = atob(base64Str.split(";base64,")[1]); // atob  方法 Window 对象 定义和用法 atob() 方法用于解码使用 base-64 编码的字符
  //要用二进制格式
  let encoding = jschardet.detect(str);
  encoding = encoding.encoding;
  // 有时候会识别错误
  if(encoding == "windows-1252"){
    encoding = "ANSI";
  }
  return encoding;
}

class InputData extends React.Component {
  constructor(props) {
    super(props);
    const data_num = this.props.dataNum
    const chart_type = this.props.type
    let basic_data = generateData(data_num)
    let basic_col = generateCol(data_num)
    const basic_columns = data_num == 1?[...this.props.inputColumns]:basic_col
    const actionCol = {
      title: 'operation',
      dataIndex: 'operation',
      width:150,
      render: (_, record) =>
        this.state.dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
            <DeleteTwoTone style={{fontSize:25}}/><a>Delete</a>
          </Popconfirm>
        ) : null,
      }

    this.state = {
      type: chart_type,
      dataNum: data_num,
      dataSource: data_num === 1?([
        {
          key: 0,
          dataId:'data0',
          data: 30,
          color: '1',
        },
        {
          key: 1,
          dataId:'data1',
          data: 30,
          color: '3',
        },
      ]): basic_data,
      columns:basic_columns.concat(actionCol),
      count: 2,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  //add new row
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const data_num = this.state.dataNum
    let addData = {key:count, dataId:`data${count}`}
    for(let i=1;i<=data_num;i++){
      addData[`type${i}`] = Math.ceil(Math.random()*10)*10
      addData[`color${i}`] = '1'
    }
    const newData = data_num === 1?({
      key: count,
      dataId: `data${count}`,
      data: Math.ceil(Math.random()*10)*10,
      color: '1',
    }):addData;
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
 
  //add new column
  handleAddCol = ()=>{
    const cols = this.state.columns
    const dataNum = this.state.dataNum
     
    const newCol1 = {title: `type${dataNum+1}`,dataIndex: `type${dataNum+1}`,editable: true,type:'input',width:120}
    const newCol2 = {title: `color${dataNum+1}`,dataIndex: `color${dataNum+1}`,editable:true,type:'select', width:120}
    cols.splice(2*dataNum+1, 0, newCol2)
    cols.splice(2*dataNum+1, 0, newCol1)
    this.setState({
      columns: cols,
      dataNum: dataNum+1
    },this.UpdateColData)
  }

  UpdateColData = ()=>{
    const dataSource = this.state.dataSource
    const dataNum = this.state.dataNum
    console.log(dataNum)
    //console.log(dataSource)
    for(let i=0;i<dataSource.length;i++){
      dataSource[i][`type${dataNum}`] = Math.ceil(Math.random()*10)*10
      dataSource[i][`color${dataNum}`] = '1'
    }
    this.setState({
      dataSource: dataSource
    })
  }
  //
  // clear all data
  handleClear = ()=>{
    const clear_data = []
    this.setState({
      dataSource: clear_data,
      count: 0
    })
  }
  //

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
    if (this.props.onDataSourceChanged) {
      this.props.onDataSourceChanged(this.state.dataSource);
    }
  };

  saveData = ()=>{
   
    if (this.props.onDataSourceChange) {
      console.log("hhh")
      this.props.onDataSourceChange(this.state.dataSource);
    }
  }

  parseFile = (file)=>{
    const _this = this
    const fReader = new FileReader()
    fReader.readAsDataURL(file)
    fReader.onload = function(evt){
      const data = evt.target.result
      const encoding = checkEncoding(data);
       
      Papa.parse(file, {
        encoding: encoding,
        complete: function(results) {        // UTF8 \r\n与\n混用时有可能会出问题
          const res = results.data;
          if(res[res.length - 1] === ""){    //去除最后的空行 有些解析数据尾部会多出空格
            res.pop();
          }
          // 当前res 就是二维数组的值 数据拿到了 那么在前端如何处理渲染 就根据需求再做进一步操作了
          
          const dataNum = res[0].length
          if(_this.state.type === "pie")
          {
            if(dataNum>1){
              message.warning("pie chart can only have at most one data dimension!")
              return false
            }
            _this.handleClear()
            const count = res.length-1
            const newData = oned_generateData(res)
            _this.setState({
              count: count,
              dataSource: newData
            })
            return true
          }
          const count = res.length-1
          const newCols = generateCol(dataNum)
          const newData = generateData(dataNum, res)
          const oldCols = _this.state.columns
          
          _this.handleClear()
          _this.setState({
            count:count,
            dataSource: newData,
            dataNum: dataNum,
            columns: [...newCols, oldCols[oldCols.length-1]]
          })
        }
      });
      return true
    }
    return false
  }

  render() {
    const _this = this;
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.state.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          type:col.type,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    const upload_props = {

    }

    return (
      <div>
        <Tooltip title="add a row" placement="topLeft">
          <DiffTwoTone
            onClick={this.handleAdd}
            style={{marginBottom:16,fontSize:'30px'}}>
          </DiffTwoTone>
        </Tooltip>
        <Tooltip title="save data and preview" placement="topLeft">
          <SaveTwoTone
            onClick={this.saveData}
            style={{marginBottom:16,marginLeft:10, fontSize:'30px'}}>
          </SaveTwoTone>
        </Tooltip>
        
        <Tooltip title="import from csv file" placement="topLeft">
          <Upload showUploadList={false} beforeUpload={this.parseFile}>
            <CloudTwoTone
              style={{marginBottom:16,marginLeft:10, fontSize:'30px'}}>  
            </CloudTwoTone>
          </Upload>
        </Tooltip>

        <Tooltip title="clear all data" placement="topLeft">
          <CloseCircleTwoTone
            onClick={this.handleClear} style={{marginBottom:16,marginLeft:10, fontSize:'30px'}}>  
          </CloseCircleTwoTone>
        </Tooltip>
        {this.props.dataNum !=1?(
        <Tooltip title="add a new data dimension" placement="topLeft">
          <PlusCircleTwoTone
            onClick={this.handleAddCol} style={{marginBottom:16,marginLeft:10, fontSize:'30px'}}>  
          </PlusCircleTwoTone>
        </Tooltip>):null
        }
        
        
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          scroll={{ y: 175, x:200 }}
        />
      </div>
    );
  }
}

export default InputData;