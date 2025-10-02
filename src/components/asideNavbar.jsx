import React, { Component } from 'react';
import BlogToc from './blogToc';

class AsideNavbar extends Component {
    state = {
        display: true,
        open: false,
        is_mobile: window.innerWidth < 768
    } 

    handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= 0) {
            this.setState({ 
                display: false,
                open: false
            });
        } else {
            this.setState({ display: true });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    setOpen = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() { 
        return (
            <React.Fragment>
                <div className={`aside-navbar-toggle ${this.state.display ? 'aside-navbar-display' : ""}`}
                    onClick={() => {this.setOpen();}}
                >
                    <i className="bi bi-list-ul"></i>
                </div>
                <div className={`aside-navbar-drawer ${this.state.open ? 'aside-navbar-drawer-open' : ''}`}>
                    <div className="aside-navbar-drawer-content">
                        <BlogToc />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default AsideNavbar;