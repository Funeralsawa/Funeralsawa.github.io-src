import React, { Component } from 'react';
import headImg from "../assets/head.jpg";

class Navbar extends Component {
    state = {
        hidden: true,
        transparent: true,
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

    render() { 
        return (
            <React.Fragment>
                <nav className={`navbar navbar-expand-lg ${this.state.hidden ? 'nav-hidden' : 'nav-appear'}
                    ${this.state.transparent ? 'nav-transparent' : ''}`} 
                    ref={this.navRef}>
                    <div className="container-fluid" style={{color: "white"}}>
                        <div className='navbar-brand' style={{marginLeft: "1%"}}>
                            <img className="nav-icon" src={headImg} alt="icon" />
                            <div className='nav-title'>Funerals's blog</div>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
 
export default Navbar;