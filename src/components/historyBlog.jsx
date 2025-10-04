import React, { Component } from 'react';
import posts from '../assets/posts/posts.json';
import { Link } from "react-router-dom";

class HistoryBlog extends Component {
    state = {
        data: []
    };

    componentDidMount = () => {
        this.setState({ data: posts});
    };

    render() { 
        return (
            <React.Fragment>
                <i className="bi bi-clock-history">&nbsp;往期文章</i>
                <div>
                    <ul>
                        <li>
                            <div className='title' style={{ color: "unset" }}>敬请期待</div>
                            <div className='time'>2025-08-09</div>
                        </li>
                        {this.state.data.map((data, index) => (
                            <li key={index}>
                                <div>
                                    <Link to={data.url.split(".")[0]} className='title'>{data.file}</Link>
                                    <div className='time'>{data.time.split(" ")[0]}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default HistoryBlog;
