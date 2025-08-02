import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Site from './components/site.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <div className="overray"></div>
      <div className="container">
        <Site />
      </div>
    </Provider>
  </BrowserRouter>
)
