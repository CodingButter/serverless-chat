import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import SnackBar from 'my-react-snackbar'
import AppBar from './AppBar'
import { useUserData } from '../hooks/useUserManager'
import { useSnackBar, SnackBarType } from '../hooks/useSnackBar'
import { usePopup } from '../hooks/usePopopManager'

export default function Layout() {
  const { snackBars } = useSnackBar()
  const { userData } = useUserData()
  const { pathname } = useLocation()
  const { Popup } = usePopup()
  const navigate = useNavigate()

  useEffect(() => {
    if ((!userData?.loggedIn && pathname !== '/login') || !userData) {
      navigate('/login')
    } else if (pathname !== '/main') {
      navigate('/main')
    }
  }, [userData, pathname, navigate])
  return (
    <div className="flex flex-col h-full bg-skin-base text-skin-base">
      {window.Main && (
        <div className="flex-none absolute top-0 left-0 w-full z-50">
          <AppBar title="Peer Discord" />
        </div>
      )}
      <div className="main-wrapper flex flex-col h-full w-full pt-8 relative">
        <div className="z-10 top-0 left-0 w-full h-full flex items-center justify-center">
          <Outlet />
        </div>{' '}
        {snackBars?.map((snackBar: SnackBarType, index: number) => (
          <SnackBar {...snackBar} />
        ))}
        {Popup && Popup}
      </div>
    </div>
  )
}
