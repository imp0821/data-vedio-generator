import React from 'react';
import 'antd/dist/antd.css';
import axios from "axios";
import { Upload, Button,message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

class UploadAE extends React.Component{
    state = {
        fileList: [],
        uploading: false,
    };

    handleUpload = ()=>{
        if(!this.state.fileList.length) {
            message.warning("请选择要上传的文件")
        }
        const formData = new FormData()
        formData.append('file', this.state.fileList[0].originFileObj)
 
        this.setState({
            uploading: true
        })

        axios({
            method:'post',
            url:'/api/test/',
            data: formData,
            headers: { "Content-Type": "multipart/form-data"}
        }).then(({data}) => {
            message.success("上传成功")
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            this.setState({
                uploading: false
            })
        })
    }

    render(){
        const { uploading, fileList } = this.state;
        const props = {
            onChange: ({file, fileList})=>{
                this.setState({
                    'fileList': fileList.length? [fileList[fileList.length - 1]] : []
                })
            },
            beforeUpload: file => {
              return false;
            },
            fileList,
          };
        return(
            <>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <Button
                type="primary"
                onClick={this.handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
                >
                {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </>
        )
    }
}

export default UploadAE;