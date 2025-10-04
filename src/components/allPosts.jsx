import React, { Component } from 'react';
import BlogPreview from './blogPreview';

class AllPosts extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className="allPosts-Container">
                    <BlogPreview num="all" />
                </div>
            </React.Fragment>
        );
    }
}
 
export default AllPosts;