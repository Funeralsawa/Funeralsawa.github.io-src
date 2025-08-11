import React, { Component } from 'react';
import { marked } from "marked";
import { Link } from "react-router-dom";

class BlogPreview extends Component {
    state = { previews: [], } 

    componentDidMount() {
        fetch('/posts/posts.json') // 先读取 posts.json，拿到所有 md 文件路径和文件名
        .then(res => {
            if (!res.ok) throw new Error('加载 posts.json 失败');
            return res.json();
        })
        .then(posts => {
        // posts 是数组，格式类似 [{ file: "React.md", url: "/posts/React.md" }, ...]
            return Promise.all( //异步任务
                posts.map(post =>
                    fetch(post.url) // 读取每个 Markdown 文件
                        .then(res => {
                            if (!res.ok) throw new Error(`加载 ${post.url} 失败`);
                            return res.text();
                        })
                        .then(text => {
                            const html = marked.parse(text);
                            return {
                                filename: post.file,
                                previewHtml: this.trimHtml(html, 180),
                            };
                        })
                )
            );
        })
        .then(previews => {
            this.setState({ previews }); // 设置所有预览数据到 state
        })
        .catch(err => {
            console.error(err);
        });
    }

    trimHtml(html, maxLength) {
        const div = document.createElement("div");
        div.innerHTML = html;
        let text = div.textContent || div.innerText || "";
        if (text.length > maxLength) {
            text = text.slice(0, maxLength) + "...";
        }
        return text;
    }

    render() { 
        return (
            <React.Fragment>
                <div className="preview-container">
                    {this.state.previews.map((post, index) => {
                        const filename = post.filename.replace(".md", "");
                        return (
                            <Link key={index} to={`/posts/${filename}`} className="preview-card card-widget">
                                <h3 className="preview-title">{filename}</h3>
                                <p className="preview-content">{post.previewHtml}</p>
                            </Link>
                        )
                    })}
                </div>
            </React.Fragment>
        );
    }
}
 
export default BlogPreview;