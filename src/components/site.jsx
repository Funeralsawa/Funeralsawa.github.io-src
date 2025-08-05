import React, { Component } from 'react';
import headImg from "../assets/head.jpg";
import {Routes, Route} from "react-router-dom";
import Left from './left';
import Subscribe from './subscribe';

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
                                <a href="mailto:tombforu@foxmail.com" target='_blank' title='Email'>
                                    <i className="bi bi-envelope mail"></i>
                                </a>
                                <a href="https://discord.com/users/952139178425069588" target="_blank" title='discord'>
                                    <i className="bi bi-discord dc"></i>
                                </a>
                                <a href="https://github.com/Funeralsawa" target="_blank" title='github'>
                                    <i class="bi bi-github github"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='body-content'>
                        <div className='left'>
                            <Left />
                        </div>
                        <div className="right">
                            <Routes>
                                <Route path='/subscribe' element={<Subscribe />}></Route>
                                <Route path='/notes'></Route>
                                <Route path='/blogs'></Route>
                                <Route path='/about'></Route>
                            </Routes>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Site;