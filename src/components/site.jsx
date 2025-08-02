import React, { Component } from 'react';
import headImg from "../assets/head.jpg";
import {Routes, Route} from "react-router-dom";

class Site extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className="content">
                    <div className="head-content">
                        <span>
                            <img src={headImg} alt="head" className='head' />
                        </span>
                        <div style={{display: 'inline-block', marginLeft: '2%'}} className='animated-text'>
                            <div>
                                {"Hello I'm Funerals".split("").map((char, index) => (
                                    <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                                        {char}
                                    </span>
                                ))}
                            </div>
                            <div>
                                <a href="mailto:tombforu@foxmail.com">
                                    <i class="bi bi-envelope mail"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='body-content'>
                        <div className='left'>
                            <div className='subscribe'>订阅</div>
                            <div className='notes'>笔记</div>
                            <div className='blog'>博客</div>
                            <div className="aboutMe">关于</div>
                        </div>
                        <div className="right">

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Site;