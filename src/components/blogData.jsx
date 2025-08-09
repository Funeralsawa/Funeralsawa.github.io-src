import React, { Component } from 'react';

class BlogData extends Component {
    state = [
        {id: 1, title: "文章", num: 1},
        {id: 2, title: "标签", num: 0},
        {id: 3, title: "分类", num: 0},
    ]

    render() { 
        return (
            <div className='blog-data'>
                {this.state.map(data => (
                    <div key={data.id} className="blog-data-el">
                        <div className="blog-data-title">{data.title}</div>
                        <div className="blog-data-num">{data.num}</div>
                    </div>
                ))}
            </div>
        );
    }
}
 
export default BlogData;