import React, { Component } from 'react';
import Navbar from './navbar';
import AsideNavbar from './asideNavbar';
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
                <Routes>
                    <Route path='/posts/*' element={<AsideNavbar />}></Route>
                </Routes>
                <Head />
                <Content />
                <Footer />
            </React.Fragment>
        );
    }
}
 
export default Site;