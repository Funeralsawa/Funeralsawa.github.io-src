import React, { Component } from 'react';
import posts from '../assets/posts/posts.json';
import { Link } from 'react-router-dom';

class BlogData extends Component {
    state = {
        papers: posts.length,
        tags: 0,
        category: 0
    }

    render() { 
        return (
            <div className='blog-data'>
                <Link className="blog-data-el" to="/posts/all">
                    <div className="blog-data-title">文章</div>
                    <div className="blog-data-num">{this.state.papers}</div>
                </Link>
                <div className="blog-data-el">
                    <div className="blog-data-title">标签</div>
                    <div className="blog-data-num">{this.state.tags}</div>
                </div>
                <div className="blog-data-el">
                    <div className="blog-data-title">分类</div>
                    <div className="blog-data-num">{this.state.category}</div>
                </div>
            </div>
        );
    }
}
 
export default BlogData;