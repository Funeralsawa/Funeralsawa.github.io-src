import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import posts from '../assets/posts/posts.json';
import { marked } from "marked";
import { Link, useLocation } from "react-router-dom";

function trimHtml(html, maxLength) {
    const div = document.createElement("div");
    div.innerHTML = html;
    let text = div.textContent || div.innerText || "";
    if (text.length > maxLength) {
        text = text.slice(0, maxLength) + "...";
    }
    return text;
}

function removeFrontMatter(text) {
  return text.replace(/^---[\s\S]*?---/, "").trim();
}

function BlogPreview(props) {
    const [previews, setPreviews] = useState([]);
    const reverseTags = {
        "all" : "全部",
        "IT" : "IT",
        "life" : "生活",
        "study" : "学习",
        "trip" : "旅行",
        "dream" : "梦话",
        "others": "其他"
    };

    const location = useLocation();

    // 扫描 src/assets/posts 下的所有 md 文件，并直接拿到源码（raw）
    const modules = import.meta.glob("../assets/posts/*.md", { as: "raw" });

    // 计算大概能显示多少个预览
    const screenHeight = window.innerHeight;
    const numItems = Math.floor(screenHeight / 160);

    useEffect(() => {
        const {num, tag} = props;
        let filteredPosts = [];

        if(tag != "all") {
            for(let post of posts) {
                for(let t of post.tags) {
                    if(t == reverseTags[tag]) {
                        filteredPosts.push(post);
                    }
                }
            }
        } else {
            filteredPosts = posts;
        }
    
        let topN = filteredPosts;
        
        if(num != "all") topN = filteredPosts.slice(0, numItems);

        const loaders = topN
            .map(post => {
                const path = `../assets/posts/${post.file}`;
                const loader = modules[path];
                if (!loader) return null;
                return loader().then(content => {
                    const clean = removeFrontMatter(content);
                    const html = marked.parse(clean);
                    const previewHtml = trimHtml(html, 150);
                    return { filename: post.file, previewHtml };
                });
            })
            .filter(Boolean); // 去掉 null

        Promise.all(loaders).then(previews => setPreviews(previews))
        .catch(err => console.error("加载 Markdown 文件失败", err));
    }, [location])

    return (
        <React.Fragment>
            <div className="preview-container">
                {previews.map((post, index) => {
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

export default BlogPreview;