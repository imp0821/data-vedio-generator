import React from 'react'
import axios from "axios";
 
 
import UploadAE from "./components/UploadAE"
import {Button, Row, Col, Checkbox,Tabs,Card,Popconfirm, message} from 'antd';
import {ParaContext} from './components/context/para-context'

import InputData from "./components/InputData"
import SlideSelect from './components/SlideSelect'
import ColorSelector from './components/ColorSelector'
import PieChart from './charts/PieChart'
import BarChart from './charts/BarChart'
import LineChart from './charts/LineChart'

const {TabPane} = Tabs

class Wrapper extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            chartType:1,
            chartState:0,
            data:{},
            paras:{
                "内圈框粗细":10,
                "外圈框粗细":10
            },
            chartData:[],
            toggleParas: this.toggleParas,
            popVisible:false,
            popLoading:false,
            renderCnt:0,
        }
    }

    toggleParas = (e,name)=>{
        let t_paras = this.state.paras
        t_paras[name]=e
        this.setState({
            paras:t_paras
        },()=>{
            console.log(this.state.paras)
        })
    }

    test = ()=>{
        console.log("hhh")
        axios.get("/api/test")
    }
    test2 = ()=>{
        const mp4urls = ["pie_center_pinkbackground_huan.mp4","pie_center_pinkbackground_huan_whitebian.mp4","bar_zong_Nobackground_Yuan.mp4","line_more.mp4"]
        let url = "api/static/" + mp4urls[this.state.renderCnt]
        let config = { responseType: 'blob' }
        axios.get(url, config)
        .then(resp => {
            let videoPlayer = document.getElementById("video1");
            videoPlayer.setAttribute('src', window.URL.createObjectURL(resp.data))
        });
    }

    chartChange = key=>{
        this.setState({
            chartType: key,
            chartState:0
        })
    }

    onDataSourceChange = newdata=>{
        let cdata = [...this.state.chartData]
        const type = this.state.chartType
        //const datas = [...this.state.data]
        console.log(type)
        cdata = new Array
        if(type == 1){
            for(let i=0;i<newdata.length;i++){
                let tmp={}
                tmp["name"]=newdata[i]["dataId"]
                tmp["type"]=newdata[i]["dataId"]
                tmp["value"]=newdata[i]["data"]
                cdata.push(tmp)
            }
        }else if(type == 2){
            for(let i=0;i<newdata.length;i++){
                let tmp1={}
                let tmp2={}
                let tmp3={}
                tmp1["dataId"]=newdata[i]["dataId"]
                tmp2["dataId"]=newdata[i]["dataId"]
                tmp3["dataId"]=newdata[i]["dataId"]
                tmp1["dataType"] = "type0"
                tmp2["dataType"] = "type1"
                tmp3["dataType"] = "type2"
                tmp1["value"] = newdata[i]["type1"]
                tmp2["value"] = newdata[i]["type2"]
                tmp3["value"] = newdata[i]["type3"]
                cdata.push(tmp1)
                cdata.push(tmp2)
                cdata.push(tmp3)
            }
        }else{
            for(let i=0;i<newdata.length;i++){
                let tmp1={}
                let tmp2={}
                let tmp3={}
                tmp1["dataId"]=newdata[i]["dataId"]
                tmp2["dataId"]=newdata[i]["dataId"]
                tmp3["dataId"]=newdata[i]["dataId"]
                tmp1["dataType"] = "type0"
                tmp2["dataType"] = "type1"
                tmp3["dataType"] = "type3"
                tmp1["value"] = newdata[i]["type1"]
                tmp2["value"] = newdata[i]["type2"]
                tmp3["value"] = newdata[i]["type3"]
                cdata.push(tmp1)
                cdata.push(tmp2)
                cdata.push(tmp3)
            }
        }
        //console.log(cdata)
        this.setState({
            data:newdata,
            chartData:cdata,
            chartState:0
        },()=>{
           //console.log(this.state.data)
           //console.log(this.state.chartData)
           this.setState({
                chartState:1
           })
        })
    }
    /*functions about popconfirm and AE generation*/
    setVisible = (t)=>{
        this.setState({
            popVisible:t
        })
    }

    setLoading = (t)=>{
        this.setState({
            popLoading:t
        },()=>{
            console.log(this.state.popLoading)
        })
    }
    renderClick = ()=>{
        this.setVisible(true)
    }

    handleOk = ()=>{
        this.setLoading(true)
        this.setState({
            renderCnt: this.state.renderCnt+1
        })
        setTimeout(()=>{
            this.setVisible(false)
            this.setLoading(false)
            this.startGenerate()
        },2000)
        setTimeout(()=>{
            message.success("渲染成功！")
            console.log(this.state.renderCnt)
            this.test2()
        },2100)
    }

    handleCancel = ()=>{
        this.setVisible(false)
    }

    startGenerate = ()=>{
        axios.get('/api/getToken/').then(res => {
            let csrf_token = res.data.token
            //console.log(csrf_token)
            window.sessionStorage.setItem("csrf_token", csrf_token)
           })
        const data={data:this.state.data, type:this.state.chartType}
        axios({
            url: '/api/generateAE/',
            method: 'post',
            data: data,
            headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              'X-CSRFToken': window.sessionStorage.getItem("csrf_token")
            }
          })
    }
    /* */


    render(){
        const isChartView = this.state.chartState;
        const type = this.state.chartType
        const basic_columns1 = [
            {title:'dataIndex',dataIndex:'dataId', width:100},
            {title: 'data',dataIndex: 'data',width: 150,editable: true,type:'input'},
            {title: 'color',dataIndex: 'color',editable:true,type:'select'}
        ]
        const basic_columns2 = [
            {title:'dataIndex',dataIndex:'dataId',width:100},
            {title: 'type1',dataIndex: 'type1',editable: true,type:'input',width:120},
            {title: 'color1',dataIndex: 'color1',editable:true,type:'select', width:120},
            {title: 'type2',dataIndex: 'type2',editable: true,type:'input', width:120},
            {title: 'color2',dataIndex: 'color2',editable:true,type:'select', width:120},
            {title: 'type3',dataIndex: 'type3',editable: true,type:'input', width:120},
            {title: 'color3',dataIndex: 'color3',editable:true,type:'select', width:120}
        ]
        let t_chart;
        if(isChartView === 0){
            t_chart = <div></div>
        }else{
            if(type == 1){
                t_chart = <PieChart chartData={this.state.chartData}></PieChart>
            }else if(type==2){
                t_chart = <BarChart chartData={this.state.chartData}></BarChart>
            }else{
                t_chart = <LineChart chartData={this.state.chartData}></LineChart>
            }
        }
        return(
            <div id="wrapper">
                {/* Intro */}
                <section id="intro" className="wrapper style1 fullscreen fade-up">
                <div className="inner">
                    <h1>AE RENDER TOOL</h1>
                    <UploadAE></UploadAE>
                    <Button
                        type='primary'
                        style={{ marginTop: 16 }}
                        onClick={this.test2}
                    >  Start Render
                    </Button>
                    <video id="video1" width={800} height={450} controls="controls autoplay">
                        <source id="video_path" src="" type="video/mp4" />
                    </video>
                </div>
                </section>
                {/* One */}
                <section id="one" className="wrapper style2 fullscreen spotlights">
                    <Tabs defaultActiveKey="1" onChange={this.chartChange}>
                    <TabPane tab="饼图" key="1">
                        <Row>
                            <Col span={12}>
                                
                                <InputData dataNum={1} inputColumns={basic_columns1} onDataSourceChange={this.onDataSourceChange.bind(this)}></InputData>
                                
                            </Col>
                            
                            <Col span={5} align="center" style={{marginLeft:20, marginTop:60}}>
                                <ParaContext.Provider value={this.state}>
                                <SlideSelect inputName="内圈框粗细" inputMax="20"></SlideSelect>
                                <SlideSelect inputName="外圈框粗细" inputMax="40"></SlideSelect>
                                <SlideSelect inputName="内圈半径" inputMax="400"></SlideSelect>
                                <SlideSelect inputName="外圈半径" inputMax="800"></SlideSelect>
                                <SlideSelect inputName="文字大小" inputMax="10"></SlideSelect>
                                </ParaContext.Provider>
                            </Col>

                            <Col span={5} align="center" style={{marginLeft:40, marginTop:60}}>
                                <Checkbox>是否填充</Checkbox>
                                <ColorSelector inputName="填充颜色"></ColorSelector>
                                <ColorSelector inputName="文字颜色"></ColorSelector>
                            </Col>
                        </Row>
                     </TabPane>
                     <TabPane tab="柱状图" key="2">
                        <Row>
                            <Col span={12}>
                                
                                <InputData dataNum={3} inputColumns={basic_columns2} onDataSourceChange={this.onDataSourceChange.bind(this)}></InputData>
                                
                            </Col>
                            
                            <Col span={5} align="center" style={{marginLeft:20, marginTop:60}}>
                                <ParaContext.Provider value={this.state}>
                                <SlideSelect inputName="y轴上限" inputMax="20"></SlideSelect>
                                <SlideSelect inputName="y轴下限" inputMax="100"></SlideSelect>
                                <SlideSelect inputName="矩形宽" inputMax="400"></SlideSelect>
                                <SlideSelect inputName="矩形间隔" inputMax="20"></SlideSelect>
                                <SlideSelect inputName="文字大小" inputMax="10"></SlideSelect>
                                </ParaContext.Provider>
                            </Col>

                            <Col span={5} align="center" style={{marginLeft:40, marginTop:60}}>
                                <Checkbox>显示辅助线</Checkbox>
                                <Checkbox>背景</Checkbox>
                                <Checkbox>显示坐标轴</Checkbox>
                                <ColorSelector inputName="文字颜色"></ColorSelector>
                            </Col>
                        </Row>
                     </TabPane>
                     <TabPane tab="折线图" key="3">
                        <Row>
                            <Col span={12}>
                                <InputData dataNum={3} inputColumns={basic_columns2} onDataSourceChange={this.onDataSourceChange.bind(this)}></InputData>
          
                            </Col>
                            
                            <Col span={5} align="center" style={{marginLeft:20, marginTop:60}}>
                                <ParaContext.Provider value={this.state}>
                                <SlideSelect inputName="y轴上限" inputMax="20"></SlideSelect>
                                <SlideSelect inputName="y轴下限" inputMax="40"></SlideSelect>
                                <SlideSelect inputName="轴线宽" inputMax="100"></SlideSelect>
                                <SlideSelect inputName="折线线宽" inputMax="100"></SlideSelect>
                                <SlideSelect inputName="折线点大小" inputMax="50"></SlideSelect>
                                <SlideSelect inputName="文字大小" inputMax="10"></SlideSelect>
                                </ParaContext.Provider>
                            </Col>

                            <Col span={5} align="center" style={{marginLeft:40, marginTop:60}}>
                                <Checkbox>显示辅助线</Checkbox>
                                <ColorSelector inputName="点颜色"></ColorSelector>
                                <ColorSelector inputName="文字颜色"></ColorSelector>
                            </Col>
                        </Row>
                     </TabPane>
                     </Tabs>
                     <Row align="center">
                        <Popconfirm
                            title="渲染数据视频"
                            visible={this.state.popVisible}
                            onConfirm={this.handleOk}
                            okButtonProps={{ loading: this.state.popLoading }}
                            onCancel={this.handleCancel}>
                        <Button type="primary" shape="round" size={'large'} onClick={this.renderClick}>
                            Go to Rendering
                        </Button>
                        </Popconfirm>
                     </Row>
                     <Row justify="space-between" align="middle" style={{marginTop:40,marginBottom:60}}>
                         <Col span={24} align="middle">
                         <Card title="预览图" bordered={false} style={{width: "40%",backgroundColor:"rgb(255,212,234)"}}>
                         {t_chart}
                        </Card>
                         </Col>
                     </Row>
                     {/* <BarChart></BarChart> */}
                     
                </section>
                {/* Two */}
                <section id="two" className="wrapper style3 fullscreen fade-up">
                    <div className="inner">
                    <h2>What we do</h2>
                    <p>Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus, lacus eget hendrerit bibendum, urna est aliquam sem, sit amet imperdiet est velit quis lorem.</p>
                    <ul className="actions">
                        <li><a href="generic.html" className="button">Learn more</a></li>
                    </ul>
                    </div>
                </section>
                {/* Three */}
                <section id="three" className="wrapper style1 fade-up">
                    <div className="inner">
                    <h2>Get in touch</h2>
                    <p>Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus, lacus eget hendrerit bibendum, urna est aliquam sem, sit amet imperdiet est velit quis lorem.</p>
                    <div className="split style1">
                        <section>
                        <ul className="contact">
                            <li>
                            <h3>Address</h3>
                            <span>12345 Somewhere Road #654<br />
                                Nashville, TN 00000-0000<br />
                                USA</span>
                            </li>
                            <li>
                            <h3>Email</h3>
                            <a href="#">user@untitled.tld</a>
                            </li>
                            <li>
                            <h3>Phone</h3>
                            <span>(000) 000-0000</span>
                            </li>
                            <li>
                            <h3>Author</h3>
                            <span>Peng Yuchen</span><br></br>
                            <span>Cheng Liqi</span><br></br>
                            <span>Zhao Qingyun</span>
                            <br></br>
                            <h3>Social</h3>
                            <ul className="icons">
                                <li><a href="www.baidu.com" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
                                <li><a href="www.baidu.com" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
                                <li><a href="www.baidu.com" className="icon brands fa-github"><span className="label">GitHub</span></a></li>
                                <li><a href="www.baidu.com" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
                                <li><a href="www.baidu.com" className="icon brands fa-linkedin-in"><span className="label">LinkedIn</span></a></li>
                            </ul>
                            </li>
                        </ul>
                        </section>
                    </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Wrapper;