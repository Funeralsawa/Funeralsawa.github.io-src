import React, { Component } from 'react';

class Footer extends Component {
    state = {  }

    getcurrentYear = () => {
        return new Date().getFullYear();
    }

    render() { 
        return (
            <div className='footer'>
                <p>2025 - {this.getcurrentYear()} By Funerals | 简洁即美</p>
                <p>Powered by React & Vite & Bootstrap & GitHub Pages</p>
            </div>
        );
    }
}
 
export default Footer;