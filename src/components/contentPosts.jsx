import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom"
import BlogApp from './blogApp';

class ContentPosts extends Component {
    state = {  } 
    render() { 
        return (
            <div className="content-posts">
                <Routes>
                    <Route path="/posts/React" element={<BlogApp name="React.md" />}></Route>
                </Routes>
            </div>
        );
    }
}
 
export default ContentPosts;