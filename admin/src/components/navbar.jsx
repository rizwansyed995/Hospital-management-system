import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    
    const { atoken, setatoken } = useContext(AdminContext)
    const navigate = useNavigate()
    const logout =()=>{
        navigate('/')
         atoken && setatoken('')
         atoken && localStorage.removeItem('atoken')
        }
        
    return (
        <div className='md:h-[80px] flex justify-between items-center md:px-4 sm:px-10  border-b bg-white '>
            <div className='w-1/12 flex items-center gap-2 text-xs'>
                <img className=' cursor-pointer ' src={assets.CareAi} alt="" />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-600 '>{atoken ? 'Admin' : 'Docotr'}</p>
            </div>
            <button onClick={logout} className='cursor-pointer bg-[#5f6FFF] text-white text-sm px-10 py-2 rounded-full'>Logout</button>
        </div>
    )
}

export default Navbar