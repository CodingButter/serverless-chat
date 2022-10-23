import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login/Login'
import Providers from './Providers'
import Main from './pages/Main/Main'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route
              path=""
              element={
                <RequireAuth>
                  <Main />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </Router>
    </Providers>
  )
}

export default App
