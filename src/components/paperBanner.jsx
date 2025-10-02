import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

class PaperBanner extends Component {
    state = {
        name: this.props.params.name || "",
        publishedAt: "",
    }
    
    componentDidMount() {
        this.getPaperInfo();
    }

    getPaperInfo = () => {
        console.log("Fetching info for paper:", this.props.params.name);
        fetch('/posts/posts.json') // 先读取 posts.json，拿到所有 md 文件路径和文件名
        .then(res => {
            if (!res.ok) throw new Error('加载 posts.json 失败');
            return res.json();
        })
        .then(posts => {
        // posts 是数组，格式类似 [{ file: "React.md", url: "/posts/React.md" }, ...]
            const post = posts.find(p => p.file === `${this.props.params.name}.md`);
            if (!post) throw new Error('未找到对应的文章');
            this.setState({...this.state, publishedAt: post.time});
        })
        .catch(err => {
            console.error(err);
        });
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

export default (props) => (
    <PaperBanner {...props} params={useParams()} />
);