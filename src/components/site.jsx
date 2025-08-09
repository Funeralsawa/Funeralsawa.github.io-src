import React, { Component } from 'react';
import Navbar from './navbar';
import Head from './head';
import Content from './content';
import Footer from './footer';
import {Routes, Route} from "react-router-dom";
import Subscribe from './subscribe';

class Site extends Component {
    state = {} 

    render() { 
        return (
            <React.Fragment>
                <Navbar />
                <Head />
                <Content />
                <Footer />
            </React.Fragment>
        );
    }
}
 
export default Site;