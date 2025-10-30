import React, { Component } from 'react';
import posts from '../assets/posts/posts.json';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

class PaperBanner extends Component {
    state = {
        name: "",
        publishedAt: "",
        lastChangeTime: "",
        fontNum: 0,
        isMobile: window.innerWidth < 768
    }
    
    componentDidMount() {
        this.getPaperInfo();
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.pathname !== prevProps.location.pathname) {
            this.getPaperInfo();
        }
    }

    getPaperInfo = () => {
        // posts 是数组，格式类似 [{ file: "React.md", url: "/posts/React.md" }, ...]
        const post = posts.find(p => p.url === `${decodeURIComponent(this.props.location.pathname)}.md`);
        const name = post ? post.file.replace(/\.md$/, '') : "";
        if (!post) {
            setTimeout(() => { //给一个Effect时间让路由切换完成
                this.props.navigate("/404", { replace: true });
            });
            return;
        }
        this.setState({
            name: name, 
            publishedAt: post.time, 
            lastChangeTime: post.LastChangeTime, 
            fontNum: post.fontNum
        });
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="paper-banner">
                    <div className="paper-banner-content">
                        <h1 align='center'>{this.state.name}</h1>
                        <div className="paperInfo">
                            <p className='paper-banner-content-font'>
                                <i class="bi bi-calendar" />
                                &nbsp;
                                发表时间：{this.state.publishedAt}
                            </p>
                            {this.state.isMobile ? null : (<p className='paper-banner-content-font'>
                                &emsp;|&emsp;</p>)}
                            <p className='paper-banner-content-font'>
                                <i class="bi bi-clock" />
                                &nbsp;
                                最后更新时间：{this.state.lastChangeTime}
                            </p>
                            {this.state.isMobile ? null : (<br />)}
                            <p className='paper-banner-content-font font-num'>
                                <i class="bi bi-file-earmark-font" />
                                &nbsp;
                                总字数：{this.state.fontNum} 
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function PaperBannerWrapper(props) {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <PaperBanner
            {...props}
            params={params}
            location={location}
            navigate={navigate}
        />
    );
}

export default PaperBannerWrapper;