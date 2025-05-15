import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <section className="w-full bg-[#3A2E72] py-10 px-4 md:px-16 lg:px-24">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* === Left: Text Content === */}
        <div className="flex flex-col gap-6 md:w-1/2 text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Book Appointments <br /> With Trusted Doctors
          </h1>
          
          <p className="text-base md:text-lg text-white/80">
            Browse a wide range of verified professionals and book appointments effortlessly. 
            Healthcare, now just a few clicks away.
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <a 
              href="#speciality"
              className="bg-[#5f6FFF] text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg hover:scale-105 transition-all duration-300 hover:bg-[#4a57d0]"
            >
              Book Appointment
            </a>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <img className="w-20 md:w-24" src={assets.group_profiles} alt="group" />
            <p className="text-sm text-white/70">
              Trusted by thousands of patients <br />
              across multiple cities.
            </p>
          </div>
        </div>

        {/* === Right: Image === */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img 
            src={assets.header_img} 
            alt="Doctor illustration" 
            className="w-full max-w-md md:max-w-lg rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}

export default Header
