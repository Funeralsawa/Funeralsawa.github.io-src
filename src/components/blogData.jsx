import React, { Component } from 'react';

class BlogData extends Component {
    state = {
        data: [
            {id: 1, title: "文章", num: 0},
            {id: 2, title: "标签", num: 0},
            {id: 3, title: "分类", num: 0},
        ]
    }

    componentDidMount = () => {
        fetch('/posts/posts.json') // 先读取 posts.json，拿到所有 md 文件路径和文件名
        .then(res => {
            if (!res.ok) throw new Error('加载 posts.json 失败');
            return res.json();
        })
        .then(posts => {
        // posts 是数组，格式类似 [{ file: "React.md", url: "/posts/React.md" }, ...]
            this.setState({data: [
                {id: 1, title: "文章", num: posts.length},
                {id: 2, title: "标签", num: 0},
                {id: 3, title: "分类", num: 0},
            ]})
        })
        .catch(err => {
            console.error(err);
        });
    }

    render() { 
        return (
            <div className='blog-data'>
                {this.state.data.map(data => (
                    <div key={data.id} className="blog-data-el">
                        <div className="blog-data-title">{data.title}</div>
                        <div className="blog-data-num">{data.num}</div>
                    </div>
                ))}
            </div>
        );
    }
}
 
export default BlogData;