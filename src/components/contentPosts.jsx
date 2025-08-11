import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom"
import BlogApp from './blogApp';
import BlogPreview from './blogPreview';

class ContentPosts extends Component {
    state = {  } 
    render() { 
        return (
            <div className="content-posts">
                <Routes>
                    <Route path="/" element={<BlogPreview />}></Route>
                    <Route path="/posts/:name" element={<BlogApp />}></Route>
                </Routes>
            </div>
        );
    }
}
 
export default ContentPosts;