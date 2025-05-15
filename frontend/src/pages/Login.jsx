import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setName] = useState('')
  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name: username, password, email })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Login Successful')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50"
      action=""
    >
      <div className="flex flex-col gap-6 items-start p-10 min-w-[340px] sm:min-w-[400px] rounded-xl text-zinc-700 shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-2">{state === 'Sign Up' ? 'Create Account' : 'Login'}</h1>

        <p className="mb-6 text-gray-600">
          Please {state === 'Sign Up' ? 'Sign Up' : 'Login'} to book an appointment
        </p>

        {state === 'Sign Up' && (
          <div className="w-full">
            <label className="block mb-1 font-medium" htmlFor="username">
              Full Name
            </label>
            <input
              id="username"
              className="border border-zinc-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={username}
              required
              placeholder="Your full name"
            />
          </div>
        )}

        <div className="w-full">
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="border border-zinc-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="w-full">
          <label className="block mb-1 font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="border border-zinc-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold transition-colors"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p className="text-sm text-gray-600">
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-indigo-600 underline cursor-pointer"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Create a new account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-indigo-600 underline cursor-pointer"
              >
                Click here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  )
}

export default Login
