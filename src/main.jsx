import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import "./css/typeWriter.css"
import "./css/base.css"
import "./css/mobile.css"
import SiteWrapper from './components/site.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Provider store={store}>
      <div className="container">
        <SiteWrapper />
      </div>
    </Provider>
  </HashRouter>
)
