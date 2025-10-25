import React, { useEffect } from 'react';
import BlogToc from './blogToc';

function AsideNavbar() {
    const [display, setdisplay] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [settingsDisplay, setSettingsDisplay] = React.useState(true);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if(currentScrollY <= 0) {
            setdisplay(false);
            setSettingsDisplay(false);
            setOpen(false);
        } else {
            setdisplay(true);
            setSettingsDisplay(true);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <React.Fragment>
            <i className="bi bi-gear aside-navbar-settings" onClick={() => {setSettingsDisplay(!settingsDisplay)}}></i>
            <div className={`aside-navbar-toggle ${display ? 'aside-navbar-display' : ""}`}
                onClick={() => {setOpen(!open);}}
            >
                <i className="bi bi-list-ul"></i>
            </div>
            <div className={`aside-navbar-arrow ${display ? 'aside-navbar-display' : ""}`}
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
                <i class="bi bi-arrow-up"></i>
            </div>
            <div className={`aside-navbar-drawer ${open ? 'aside-navbar-drawer-open' : ''}`}>
                <div className="aside-navbar-drawer-content">
                    <BlogToc />
                </div>
            </div>
        </React.Fragment>
    )
}

export default AsideNavbar;