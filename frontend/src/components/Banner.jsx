import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext' // Don't forget this!

const Banner = () => {
  const { token } = useContext(AppContext)
  const navigate = useNavigate()

  if (token) return <></> // no banner if not logged in

  return (
    <div className="flex bg-[#5f6FFF] rounded-lg px-6 sm:px-14 lg:px-12 my-12 md:mx-10">
      {/* --- Left Side --- */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 2xl:ml-30">
        <div className="text-xl sm:text-xl md:text-2xl lg:text-4xl font-semibold text-white">
          <p>Book Appointment</p>
          <p className="mt-3">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate('/login')
            scrollTo(0, 0)
          }}
          className="bg-white text-sm sm:text-base cursor-pointer text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Create Account
        </button>
      </div>

      {/* --- Right Side --- */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-full absolute bottom-0 right-5 2xl:mr-30"
          src={assets.appointment_img}
          alt="Appointment"
        />
      </div>
    </div>
  )
}

export default Banner
