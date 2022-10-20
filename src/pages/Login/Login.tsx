import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Background from '../../assets/images/login-background.png'
import Input from '../../components/Input'
import Surface from '../../components/Surface'
import { useUserData } from '../../hooks/useUserManager'
import { useSnackBar } from '../../hooks/useSnackBar'

export default function Login() {
  const navigate = useNavigate()
  const { userData, setUserData } = useUserData()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const passwordRef = useRef<HTMLInputElement>(null)
  const { addSnackBar } = useSnackBar()

  const handleLogin = () => {
    setUserData({ name: username, password, loggedIn: true })
    navigate('/main')
  }

  const handleLoginCheck = (): void => {
    if (username && password) {
      if (username === userData?.name) {
        if (password !== userData?.password) {
          addSnackBar({
            message: 'Wrong Password, Overwrite current user?',
            type: 'error',
            containerStyle: { height: '75px' },
            onYes: handleLogin,
            onNo: () => {
              passwordRef?.current?.focus()
              setPassword('')
            }
          })
        } else {
          handleLogin()
        }
      } else {
        handleLogin()
      }
    }
  }

  useEffect(() => {
    setUsername(userData?.name)
  }, [userData])

  return (
    <div className="w-full h-full bg-skin-base overflow-hidden flex flex-col items-center justify-center">
      <img className="z-0 object-cover absolute min-w-full min-h-full top-0 left-0" src={Background} alt="background" />
      <div className="z-10">
        <Surface>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-2xl font-bold">Peer Discord</div>
            <Input
              onChange={({ target }) => setUsername(target.value)}
              type="text"
              placeholder="Username"
              value={username}
            />
            <Input
              ref={passwordRef}
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              placeholder="Password"
              value={password}
            />
            <Input onClick={handleLoginCheck} type="submit" value="Login" className="w-full hover:bg-opacity-50" />
          </div>
        </Surface>
      </div>
    </div>
  )
}
