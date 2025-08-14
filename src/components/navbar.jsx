import React, { Component } from 'react';
import headImg from "../assets/head.jpg";
import blogToc from './blogToc';
import BlogToc from './blogToc';

class Navbar extends Component {
    state = {
        hidden: true,
        transparent: true,
        open: false,
    } 

    lastScrollY = 0;
    navRef = React.createRef();

    handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > this.lastScrollY) {
            this.setState({ hidden: true });
        } else {
            this.setState({ hidden: false });
        }

        if (currentScrollY <= 0) {
            this.setState({ transparent: true });
        } else {
            this.setState({ transparent: false });
        }

        this.lastScrollY = currentScrollY;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        setTimeout(() => {
            this.navRef.current.classList.add("nav-begin");
        }, 100);
        
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    onClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    setOpen = (flag) => {
        this.setState({
            open: flag
        })
    }

    style1 = {
        userSelect: "none",
        cursor: "pointer",
        marginLeft: "1%"
    }

    render() { 
        return (
            <React.Fragment>
                <nav className={`navbar navbar-expand-lg ${this.state.hidden ? 'nav-hidden' : 'nav-appear'}
                    ${this.state.transparent ? 'nav-transparent' : ''}`} 
                    ref={this.navRef}>
                    <div className="container-fluid" style={{color: "white"}}>
                        <div onClick={this.onClick} className='navbar-brand' style={this.style1}>
                            <img className="nav-icon" src={headImg} alt="icon" draggable="False" />
                            <div className='nav-title'>Funerals's blog</div>
                        </div>
                        <div className="toc-toggle" onClick={() => this.setOpen(true)}>☰</div>
                    </div>
                    <div className={`toc-drawer ${this.state.open ? 'open' : ''}`}>
                        <button className="close-btn" onClick={() => this.setOpen(false)}>✕</button>
                        <div className="toc-content">
                            <BlogToc />
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
 
export default Navbar;