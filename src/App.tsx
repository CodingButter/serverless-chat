import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { UserDataProvider } from './hooks/useUserManager'
import { SnackBarProvider } from './hooks/useSnackBar'
import { PopupProvider } from './hooks/usePopopManager'
import Main from './pages/Main/Main'

function App() {
  return (
    <PopupProvider>
      <SnackBarProvider>
        <UserDataProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="main" element={<Main />} />
              </Route>
            </Routes>
          </Router>
        </UserDataProvider>
      </SnackBarProvider>
    </PopupProvider>
  )
}

export default App
