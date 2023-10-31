import './styles/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import {App} from './App.tsx'
import {MachineState} from './context/VendorContext.tsx'

const element = document.querySelector("#root");
if (element) {
    ReactDOM.createRoot(element).render(
        <React.StrictMode>
            <MachineState>
                <App/>
            </MachineState>
        </React.StrictMode>
    )
}
