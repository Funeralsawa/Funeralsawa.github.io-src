import React, { Component } from 'react';
import { Link } from "react-router-dom";

class HistoryBlog extends Component {
    state = {
        data: []
    };

    componentDidMount = () => {
        fetch('/posts/posts.json')
            .then(res => {
                if (!res.ok) throw new Error('加载 posts.json 失败');
                return res.json();
            })
            .then(posts => {
                // 直接获取文章的信息
                Promise.all(posts.map(async post => {
                    /*
                    try {
                        const res = await fetch(post.url, { method: 'HEAD' });
                        const lastModified = res.headers.get('Last-Modified');
                        return {
                            ...post,
                            time: lastModified ? new Date(lastModified).toLocaleDateString() : '未知时间'
                        };
                    } catch {
                        return { ...post, time: '未知时间' };
                    }
                    */
                    return {...post}
                }))
                .then(postsWithTime => {
                    this.setState({ data: postsWithTime });
                });
            })
            .catch(err => {
                console.error(err);
            });
    };

    render() { 
        return (
            <React.Fragment>
                <i className="bi bi-clock-history">&nbsp;往期文章</i>
                <div>
                    <ul>
                        <li>
                            <div className='title' style={{ color: "unset" }}>敬请期待</div>
                            <div className='time'>2025-08-09</div>
                        </li>
                        {this.state.data.map((data, index) => (
                            <li key={index}>
                                <Link to={data.url.split(".")[0]} className='title'>{data.file}</Link>
                                <div className='time'>{data.time}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default HistoryBlog;
