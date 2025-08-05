import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Left extends Component {
    state = {
        webs: [
            {id: 1, title: "订阅", to: "subscribe"},
            {id: 2, title: "笔记", to: "notes"},
            {id: 3, title: "博客", to: "blogs"},
            {id: 4, title: "关于", to: "about"}
        ]
    }

    render() { 
        return (
            <React.Fragment>
                {this.state.webs.map(web => (
                    <Link key={web.id} to={web.to} className='leftLink'>{web.title}</Link>
                ))}
            </React.Fragment>
        );
    }
}
 
export default Left;