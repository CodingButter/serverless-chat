import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Background from '../../assets/images/login-background.png'
import Input from '../../components/Input'
import Surface from '../../components/Surface'
import { useAuth } from '../../hooks/useAuth'
import { User } from '../../types/user'
import { useSnackBar } from '../../hooks/useSnackBar'
import { fetchData } from '../../hooks/useApi'
import { useModal } from '../../hooks/useModal'
import PrivateKeyDisplay from './components/PrivateKeyDisplay'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const passwordRef = useRef<HTMLInputElement>(null)
  const { addSnackBar } = useSnackBar()
  const { openModal, closeModal } = useModal()
  const handleLogin = async () => {
    const data = await fetchData('/login', { username, password })
    if (data.token) {
      login(data.token)
      navigate('/')
    } else if (data.error) {
      addSnackBar(data.error, 'error')
    }
  }

  const handleRegister = async () => {
    // const data = await fetchData('/register', { username, password })
    const data = {
      token: 'test',
      privateKey: [
        '-----BEGIN RSA PRIVATE KEY-----',
        'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL',
        'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/',
        'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ',
        'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi',
        'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ',
        'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07',
        'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=',
        '-----END RSA PRIVATE KEY-----'
      ].join('\n')
    }

    if (data.token) {
      // login(data.token)
      openModal(<PrivateKeyDisplay privateKey={data.privateKey} closeModal={closeModal} username={username} />)
    }
  }
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
            <div className="flex flex-col gap-2 justify-center items-center h-[80px] w-full">
              <Input
                onClick={handleLogin}
                type="submit"
                value="Login"
                className="w-full hover:bg-opacity-50 h-3/5 p-0 text-center hover:h-full transition-all duration-500"
              />
              <Input
                onClick={handleRegister}
                type="submit"
                value="Register"
                className="w-full hover:bg-opacity-50 h-3/5 p-0 hover:h-full transition-all duration-500"
              />
            </div>
            <button onClick={() => {}} className="text-skin-base hover:text-skikin-base/50">
              Use Private Key
            </button>
          </div>
        </Surface>
      </div>
    </div>
  )
}
