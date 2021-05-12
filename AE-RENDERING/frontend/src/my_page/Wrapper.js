import React from 'react'
import axios from "axios";

import MyChart from "./MyChart"
class Wrapper extends React.Component{
    test = ()=>{
        console.log("hhh")
        axios.get("/api/test")
    }
    render(){
        return(
            <div id="wrapper">
                {/* Intro */}
                <section id="intro" className="wrapper style1 fullscreen fade-up">
                <div className="inner">
                    <h1>AE RENDER TOOL</h1>
                    <ul className="actions">
                        <li><a id="btn1" className="button" onClick={this.test}>Select AErender</a></li>
                        <li><a id="btn2" className="button">Select File</a></li>
                        <li><a id="btn3" className="button">Start Render</a></li>
                        <li><a id="btn4" className="button">Play</a></li>
                    </ul>
                    <input type="file" name="file" id="file1" style={{display: 'none'}} />
                    <input type="file" name="file" id="file2" style={{display: 'none'}} />
                    <video id="videoid" width={800} height={450} controls="controls autoplay">
                        <source id="video_path" src="{{ STATIC_URL }}video/output.mp4" type="video/mp4" />
                    </video>
                </div>
                </section>
                {/* One */}
                <section id="one" className="wrapper style2 fullscreen spotlights">
                    <MyChart></MyChart>

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
                                <li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
                                <li><a href="#" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
                                <li><a href="#" className="icon brands fa-github"><span className="label">GitHub</span></a></li>
                                <li><a href="#" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
                                <li><a href="#" className="icon brands fa-linkedin-in"><span className="label">LinkedIn</span></a></li>
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