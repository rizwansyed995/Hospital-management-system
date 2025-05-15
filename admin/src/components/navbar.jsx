import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const { atoken, setatoken } = useContext(AdminContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    if (atoken) {
      setatoken('')
      localStorage.removeItem('atoken')
    }
  }

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-white border  shadow-md">
      <div className="flex items-center gap-4">
       <NavLink to="/"><img className="h-10 w-auto cursor-pointer" src={assets.CareAi} alt="CareAi Logo"  /></NavLink> 
        <span className="text-sm font-semibold text-gray-300 bg-gray-700 rounded-full px-4 py-1 select-none">
          {atoken ? 'Admin' : 'Doctor'}
        </span>
      </div>
      <button
        onClick={logout}
        aria-label="Logout"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition"
      >
        Logout
      </button>
    </header>
  )
}

export default Navbar
