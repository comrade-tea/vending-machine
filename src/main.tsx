import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import {MachineState} from "./context/VendorContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <MachineState>
         <App/>
      </MachineState>
   </React.StrictMode>,
)

