import React, { useContext, useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Popconfirm, Form, InputNumber, Select} from 'antd';
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

class InputData extends React.Component {
  constructor(props) {
    super(props);
    const basic_columns = [...this.props.inputColumns]
    const data_num = this.props.dataNum
    this.columns = basic_columns.concat(
    {
        title: 'operation',
        dataIndex: 'operation',
        width:150,
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
    })
    this.state = {
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
      ]):([
        {
          key: 0,
          dataId:'data0',
          type1: 20,
          color1: '1',
          type2: 40,
          color2: '3',
          type3: 10,
          color3: '2'
        },
        {
          key: 1,
          dataId:'data1',
          type1: 50,
          color1: '2',
          type2: 30,
          color2: '4',
          type3: 20,
          color3: '1'
        },
      ]),
      count: 2,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const data_num = this.props.dataNum
    const newData = data_num === 1?({
      key: count,
      dataId: `data${count}`,
      data: 100,
      color: '1',
    }):(
      {
      key: count,
      dataId: `data ${count}`,
      type1: 80,
      color1: '1',
      type2: 50,
      color2: '2',
      type3: 20,
      color3: '4'
      }
    );
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
    if (this.props.onDataSourceChanged) {
      console.log("hhh")
      this.props.onDataSourceChanged(this.state.dataSource);
    }
  };

  saveData = ()=>{
   
    if (this.props.onDataSourceChange) {
      console.log("hhh")
      this.props.onDataSourceChange(this.state.dataSource);
    }
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
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
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Button
          onClick={this.saveData}>
            Save
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          scroll={{ y: 240, x:200 }}
        />
      </div>
    );
  }
}

export default InputData;