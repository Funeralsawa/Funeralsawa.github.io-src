import React, { Component } from 'react';
import posts from '../assets/posts/posts.json';
import { marked } from "marked";
import { Link } from "react-router-dom";

class BlogPreview extends Component {
    state = { previews: [], }

    componentDidMount() {
        // 扫描 src/assets/posts 下的所有 md 文件，并直接拿到源码（raw）
        const modules = import.meta.glob("../assets/posts/*.md", { as: "raw" });

        // 计算大概能显示多少个预览
        const screenHeight = window.innerHeight;
        const numItems = Math.floor(screenHeight / 160);

        let topN = posts;
        if(this.props.num != "all") {
            topN = posts.slice(0, numItems);
        }

        const loaders = topN
            .map(post => {
                const path = `../assets/posts/${post.file}`;
                const loader = modules[path];
                if (!loader) return null;
                return loader().then(content => {
                    const html = marked.parse(content);
                    const previewHtml = this.trimHtml(html, 150);
                    return { filename: post.file, previewHtml };
                });
            })
            .filter(Boolean); // 去掉 null

        Promise.all(loaders).then(previews => this.setState({ previews }))
        .catch(err => console.error("加载 Markdown 文件失败", err));
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