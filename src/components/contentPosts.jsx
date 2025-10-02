import React, { Component } from 'react';
import BlogPreview from './blogPreview';

class ContentPosts extends Component {
    state = {  } 
    render() { 
        return (
            <div className="content-posts">
                <BlogPreview />
            </div>
        );
    }
}
 
export default ContentPosts;