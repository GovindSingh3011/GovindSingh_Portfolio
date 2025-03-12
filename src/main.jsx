import React from 'react';
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, Navigate, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import Resume from './components/Resume/Resume.jsx'
import Contact from './components/Contact/Contact.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/contact" element={<Contact />} />

      {/* <Route path="/about" element={<About />} /> */}

      <Route path="*" element={<Navigate to="/"/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)