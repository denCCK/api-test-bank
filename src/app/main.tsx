import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles.css'
import { store } from '../shared/store'

const container = document.getElementById('root')
if (!container) throw new Error('Root element not found')
createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
