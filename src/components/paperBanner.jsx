import React, { Component } from 'react';
import posts from '../assets/posts/posts.json';
import { useParams, useLocation } from 'react-router-dom';

class PaperBanner extends Component {
    state = {
        name: "",
        publishedAt: "",
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
        if (!post) throw new Error('未找到对应的文章');
        this.setState({name: name, publishedAt: post.time});
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="paper-banner">
                    <div className="paper-banner-content">
                        <h1>{this.state.name}</h1>
                        <p className='paper-banner-content-time'>发表时间：{this.state.publishedAt}</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (props) => {
    const location = useLocation();
    return (
        <PaperBanner {...props} params={useParams() } location={location} />
    )
};