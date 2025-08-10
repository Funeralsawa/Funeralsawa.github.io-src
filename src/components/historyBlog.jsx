import React, { Component } from 'react';
import { Link } from "react-router-dom"

class HistoryBlog extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <i class="bi bi-clock-history">&nbsp;往期文章</i>
                <ul>
                    <li>
                        <div className='title' style={{color: "unset"}}>敬请期待</div>
                        <div className='time'>2025-08-09</div>
                    </li>
                    <li>
                        <Link to="/posts/React" className='title'>React.md</Link>
                        <div className='time'>2025-08-09</div>
                    </li>
                </ul>
            </React.Fragment>
        );
    }
}
 
export default HistoryBlog;