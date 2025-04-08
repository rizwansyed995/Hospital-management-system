import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row  flex-wrap bg-[#5f6FFF] xl:h-90 rounded-lg px-6  md:px-10 lg:px-20'>
        {/* -----left side---- */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-2 py-10 m-auto md:py-[3vw] md:px-[1vw] '>
            <p className='text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight '>Book Appointment <br /> With Trusted Doctors   </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light '>
            <img className='w-30 md:w-24  ' src={assets.group_profiles} alt="" />
            <p>Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block' />schedule your appointment hassle-free.</p>
            </div>
            <a className='flex item-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0  hover:scale-110 transition-all  duration-300 ' href="#speciality">Book Appointment  <img className='w-3 ' src={assets.arrow_icon} alt="" /> </a>
        </div>
        {/* --------right side------ */}
        <div className='md:w-1/2  relative   '>
            <img className='w-full md:w-[80%] 2xl:w-[65%]   md:absolute bottom-0 h-auto rounded-lg ' src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header