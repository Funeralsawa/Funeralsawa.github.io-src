import React, { Component } from 'react';
import Navbar from './navbar';
import Head from './head';
import Content from './content';
import Footer from './footer';
import BlogApp from './blogApp';
import AsideNavbar from './asideNavbar';
import PaperBanner from './paperBanner';
import bg from '../assets/background.png';
import {Routes, Route, useLocation} from "react-router-dom";

class Site extends Component {
    state = {
        is_mobile: window.innerWidth < 768
    }

    componentDidMount() {
        this.updateBackground(this.props.location.pathname);
    }


    componentDidUpdate(prevprops) {
        if(this.props.location.pathname !== prevprops.location.pathname) {
            this.updateBackground(this.props.location.pathname);
        }
    }

    updateBackground = (pathname) => {
        if (pathname.startsWith("/posts/")) {
            document.body.style.backgroundImage = "";
        }
        else {
            document.body.style.backgroundImage = `url(${bg})`;
        }
    }

    render() { 
        return (
            <React.Fragment>
                <Navbar />
                <Routes>
                    <Route path="/" element={(
                        <React.Fragment>
                        <Head />
                        <Content />
                        </React.Fragment>
                    )} />
                    <Route path="/posts/:name" element={(
                        <>
                            <div className="blog-content-container">
                                <PaperBanner />
                                <div className='blog-content'>
                                    <BlogApp />
                                    <AsideNavbar />
                                </div>
                            </div>
                        </>
                    )} />
                </Routes>
                <Footer />
            </React.Fragment>
        );
    }
}

export default function SiteWrapper() {
    const location = useLocation();
    return <Site location={location} />
}