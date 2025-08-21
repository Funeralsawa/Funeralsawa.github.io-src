import React, { Component } from 'react';
import HistoryBlog from './historyBlog';
import BlogData from './blogData';
import headImg from '../assets/head.jpg';
import Subscribe from './subscribe';

class InfoDrawer extends Component {
    state = {
        showSubscribe: false
    } 

    handleClick = () => {
        if(window.innerWidth < 768) {
            this.setState({
                showSubscribe: !this.state.showSubscribe
            });
        }
    }
    
    render() { 
        return (
            <React.Fragment>
                <div className='info-drawer-content'>
                    <div className="info-drawer-content-bloginfo">
                        <img src={headImg} alt="headImg" draggable="false" />
                        <BlogData />
                    </div>
                    <div className="info-drawer-content-somefunction info-drawer-content-card-widget">
                        <a href="/">
                            <i class="bi bi-house-door-fill"></i>
                            &nbsp;
                            首页
                        </a>
                        <div className="subscribe-button" onClick={this.handleClick}>
                            <i class="bi bi-airplane"></i>
                            &nbsp;
                            订阅
                        </div>
                    </div>
                    <div className="content-aside-newest-essay info-drawer-content-card-widget">
                        {this.state.showSubscribe ? <Subscribe /> : <HistoryBlog />}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default InfoDrawer;