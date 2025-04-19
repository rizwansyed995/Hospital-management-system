import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
const Navbar = () => {

  const navigate = useNavigate();
  const [showMenu, setMenu] = useState(false);
  const { token, setToken } = useContext(AppContext);
  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
  }
  return (
    <div className='flex items-center justify-between text-md md:text-lg py-4  border-b border-b-gray-400 mb-10' >
      <Link to='/' ><img className='w-35 cursor-pointer' src={assets.CareAi} alt="" /></Link>

      <ul className='hidden md:flex item-start gap-5 font-medium  ' >
        <NavLink to='/'>
          <li className='py-1'>Home</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden ' />
        </NavLink>
        <NavLink to='/doctors'>
          <li className='py-1'>All Doctors</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden ' />
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>About</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden ' />
        </NavLink>
        <NavLink to='/contact'>
          <li className='py-1'>Contact</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden ' />
        </NavLink>
      </ul>
      <div className='flex item-center gap-4 '>
        {
          token ?
            <div className='flex items-center gap-2 cursor-pointer group relative' >
              <img className='w-8 rounded-full ' src={assets.profile_pic} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 *:'>
                  <p onClick={() => { navigate("/my-profile") }} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => { navigate("/my-appointments") }} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={() => { logout }} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => { navigate('/login') }} className=' cursor-pointer bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block ' >Create Account</button>
        }
        <img onClick={() => setMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        {/* Mobile menu */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all  `}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.CareAi} alt="" />
            <img className='w-7 h-8' onClick={() => setMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center  gap-2 mt-5 px-5 text-lg font-medium ' >
            <NavLink to='/' onClick={() => setMenu(false)}><p className='px-4 py-2 rounded inline-block' >Home</p> </NavLink>
            <NavLink to='/doctors' onClick={() => setMenu(false)}><p className='px-4 py-2 rounded inline-block' >ALL DOCTORS</p></NavLink>
            <NavLink to='/about' onClick={() => setMenu(false)}> <p className='px-4 py-2 rounded inline-block' >ABOUT</p></NavLink>
            <NavLink className='px-4 py-2 rounded inline-block' to='/contact' onClick={() => setMenu(false)}><p className='px-4 py-2 rounded inline-block' >CONTACT</p></NavLink>
          </ul>
        </div>
      </div>



    </div>
  )
}

export default Navbar