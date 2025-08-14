import React, { Component } from 'react';
import headImg from "../assets/head.jpg";
import BlogData from './blogData';
import ContentPosts from './contentPosts'
import HistoryBlog from './historyBlog';
import BlogToc from './blogToc';
import { connect } from 'react-redux';
import {Routes, Route} from "react-router-dom";

class Content extends Component {
    state = {
        is_mobile: window.innerWidth < 768
    } 
    render() {
        return (
            <React.Fragment>
                <div className="content">
                    <ContentPosts />
                    <div className='content-aside'>
                        <div className="content-aside-bloginfo card-widget">
                            <img src={headImg} alt="headImg" draggable="false" />
                            <p>Funerals</p>
                            <BlogData />
                            <a href="https://github.com/Funeralsawa" target="_blank">
                                <i class="bi bi-github github"></i>
                                &nbsp;
                                Follow Me
                            </a>
                            <div className='content-aside-link'>
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
                        <div className="content-aside-announce card-widget">
                            <i class="bi bi-geo-alt">&nbsp;潮汕</i>
                            <p>
                                大抵是个INTJ-A，勉强算个全栈工程师，偏爱前端。
                                心理学，社会学，计算机科学，欢迎与我交流。                                
                            </p>
                        </div>
                        <div className="content-aside-newest-essay card-widget">
                            <Routes>
                                <Route path="/" element={<HistoryBlog />}></Route>
                                {this.state.is_mobile ? (
                                    <Route path="/posts/*" element={<HistoryBlog />}></Route>) : (
                                    <Route path="/posts/*" element={<BlogToc />}></Route>)
                                }
                            </Routes>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Content;