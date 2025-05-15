import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)
const [showDropdown, setShowDropdown] = useState(false)

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
    navigate('/')
  }

  // Styling active NavLink
  const activeClass = 'border-b-2 border-[#3A2E72] text-black'

  return (
    <nav className="bg-transparent text-black py-4 px-8 flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img className="w-36 cursor-pointer" src={assets.CareAi} alt="CareAi Logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 font-medium text-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `py-1 hover:text-[#5f6FFF] transition-colors duration-300 ${isActive ? activeClass : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            `py-1 hover:text-[#5f6FFF] transition-colors duration-300 ${isActive ? activeClass : ''}`
          }
        >
          All Doctors
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `py-1 hover:text-[#5f6FFF] transition-colors duration-300 ${isActive ? activeClass : ''}`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `py-1 hover:text-[#5f6FFF] transition-colors duration-300 ${isActive ? activeClass : ''}`
          }
        >
          Contact
        </NavLink>
      </ul>

      {/* Right side buttons/user */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="relative cursor-pointer flex items-center gap-2">
  <div onClick={() => setShowDropdown(prev => !prev)} className="flex items-center gap-2">
    <img
      className="w-9 h-9 rounded-full border-2 border-[#5f6FFF]"
      src={userData.image}
      alt="User avatar"
    />
    <img className="w-3" src={assets.dropdown_icon} alt="dropdown" />
  </div>

  {/* Dropdown menu */}
  {showDropdown && (
    <div className="absolute right-0 top-full mt-2 bg-[#2a245c] rounded-md shadow-lg min-w-[160px] z-20">
      <div className="flex flex-col text-white py-3">
        <button
          onClick={() => {
            navigate('/my-profile')
            setShowDropdown(false)
          }}
          className="px-4 py-2 hover:bg-[#5f6FFF] transition-colors"
        >
          My Profile
        </button>
        <button
          onClick={() => {
            navigate('/my-appointments')
            setShowDropdown(false)
          }}
          className="px-4 py-2 hover:bg-[#5f6FFF] transition-colors"
        >
          My Appointments
        </button>
        <button
          onClick={() => {
            logout()
            setShowDropdown(false)
          }}
          className="px-4 py-2 hover:bg-[#f87171] transition-colors text-red-400 hover:text-red-100 font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  )}
</div>

        ) : (
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block bg-[#3A2E72] px-8 py-3 rounded-full text-white font-semibold hover:bg-[#4a57d0] transition-colors"
          >
            Create Account
          </button>
        )}

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenu(true)}
          className="md:hidden focus:outline-none"
          aria-label="Open menu"
        >
          <img className="w-6" src={assets.menu_icon} alt="menu icon" />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full md:hidden bg-[#3A2E72] z-40 transform ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-[#5f6FFF]">
          <img className="w-36" src={assets.CareAi} alt="CareAi Logo" />
          <button
            onClick={() => setMenu(false)}
            className="focus:outline-none"
            aria-label="Close menu"
          >
            <img className="w-7 h-7" src={assets.cross_icon} alt="close icon" />
          </button>
        </div>

        <ul className="flex flex-col items-center  mt-8 text-white text-xl font-medium">
          <NavLink to="/" onClick={() => setMenu(false)} className="w-full text-center py-3 hover:bg-[#5f6FFF] transition-colors rounded">
            Home
          </NavLink>
          <NavLink to="/doctors" onClick={() => setMenu(false)} className="w-full text-center py-3 hover:bg-[#5f6FFF] transition-colors rounded">
            All Doctors
          </NavLink>
          <NavLink to="/about" onClick={() => setMenu(false)} className="w-full text-center py-3 hover:bg-[#5f6FFF] transition-colors rounded">
            About
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenu(false)} className="w-full text-center py-3 hover:bg-[#5f6FFF] transition-colors rounded">
            Contact
          </NavLink>
          {!token && (
            <button
              onClick={() => {
                setMenu(false)
                navigate('/login')
              }}
              className="bg-[#5f6FFF] w-full mx-6 py-3 rounded-full font-semibold text-white hover:bg-[#4a57d0] transition-colors"
            >
              Create Account
            </button>
          )}
          {token && userData && (
            <>
              <button
                onClick={() => {
                  setMenu(false)
                  navigate('/my-profile')
                }}
                className="w-full mx-6 py-3 rounded-full hover:bg-[#5f6FFF] transition-colors"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  setMenu(false)
                  navigate('/my-appointments')
                }}
                className="w-full mx-6 py-3 rounded-full hover:bg-[#5f6FFF] transition-colors"
              >
                My Appointments
              </button>
              <button
                onClick={() => {
                  logout()
                  setMenu(false)
                }}
                className="w-full mx-6 py-3 rounded-full hover:bg-[#f87171] text-red-400 hover:text-white font-semibold transition-all"
              >
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
