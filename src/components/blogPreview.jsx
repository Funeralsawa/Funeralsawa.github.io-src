import React, { Component } from 'react';
import { marked } from "marked";
import { Link } from "react-router-dom";

class BlogPreview extends Component {
    state = { previews: [], } 

    componentDidMount() {
        // 扫描 src/assets/posts 下的所有 md 文件，并直接拿到源码（raw）
        const modules = import.meta.glob("../assets/posts/*.md", { as: "raw" });

        Promise.all(
            Object.entries(modules).map(([path, loader]) =>
                loader().then(content => {
                    const filename = path.split("/").pop(); // 提取文件名
                    const html = marked.parse(content);    // 转 HTML
                    return {
                        filename,
                        previewHtml: this.trimHtml(html, 180)
                    };
                })
            )
        )
        .then(previews => {
            this.setState({ previews });
        })
        .catch(err => {
            console.error("加载 Markdown 文件失败", err);
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