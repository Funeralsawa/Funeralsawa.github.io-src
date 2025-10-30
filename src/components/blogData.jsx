import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import posts from '../assets/posts/posts.json';
import { Link } from 'react-router-dom';

function BlogData() {
    const [papers, setPapers] = useState(posts.length);
    const [tags, setTags] = useState(0);
    const [category, setCategory] = useState(7);

    useEffect(() => {
        let tagSet = new Set();

        posts.forEach(post => {
            post.tags.forEach(tag => {
                if(!tagSet.has(tag)) {
                    tagSet.add(tag);
                }
            })
        });

        setTags(tagSet.size);
    }, []);

    return (
        <div className='blog-data'>
            <Link className="blog-data-el" to="/posts/all?tags=all">
                <div className="blog-data-title">文章</div>
                <div className="blog-data-num">{papers}</div>
            </Link>
            <Link className="blog-data-el" to="/posts/all?tags=all">
                <div className="blog-data-title">标签</div>
                <div className="blog-data-num">{tags}</div>
            </Link>
            <Link className="blog-data-el" to="/posts/all?tags=all">
                <div className="blog-data-title">分类</div>
                <div className="blog-data-num">{category}</div>
            </Link>
        </div>
    );
}

export default BlogData;