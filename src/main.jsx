import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import "./css/typeWriter.css"
import "./css/base.css"
import "./css/mobile.css"
import SiteWrapper from './components/site.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import { HashRouter, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <ScrollToTop />
    <Provider store={store}>
      <div className="container">
        <SiteWrapper />
      </div>
    </Provider>
  </HashRouter>
)
