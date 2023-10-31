import './styles/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import {App} from './App.tsx'
import {VendorState} from './context/VendorContext.tsx'

const element = document.querySelector("#root");
if (element) {
    ReactDOM.createRoot(element).render(
        <React.StrictMode>
            <VendorState>
                <App/>
            </VendorState>
        </React.StrictMode>
    )
}
