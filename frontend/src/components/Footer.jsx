import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (

    <div className='md:mx-10 mt-32 '>
        <hr />
        <div className='flex flex-col md:grid md:grid-cols-[3fr_1fr_1fr] gap-1 my-10  text-sm sm:grid-cols-1 sm:justify-center '>
            {/* left side */}
            <div className='md:ml-30'>
                <img className=' mb-5 w-40' src={assets.CareAi} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>This is our Hospital appointment booking project ✌️</p>
            </div>
            {/* middle */}
            <div>
                <p className='text-xl font-medium  mb-5'>Company</p>
                <ul className='flex flex-col gap-2  text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy </li>
                </ul>
            </div>
            {/* right side */}
            <div>
                <p className='text-xl font-medium  mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2  text-gray-600' >
                    <li>Syed Rizwan</li>
                    <li>G.Sagar Kumar</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer