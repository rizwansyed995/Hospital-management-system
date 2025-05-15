import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData
  } = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const navigate = useNavigate()

  const daysOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const fetchDocInfo = () => {
    const doctor = doctors.find(doc => doc._id === docId)
    setDocInfo(doctor || null)
  }

  const getAvailableSlots = () => {
    if (!docInfo) return

    const slots = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      const start = new Date(date)
      const end = new Date(date.setHours(18, 0, 0, 0))

      if (i === 0) {
        const currentHour = today.getHours()
        start.setHours(currentHour >= 10 ? currentHour + 1 : 10)
        start.setMinutes(today.getMinutes() > 30 ? 30 : 0)
      } else {
        start.setHours(10, 0, 0, 0)
      }

      const daySlots = []
      while (start < end) {
        const formattedTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const slotDate = `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}`
        const isBooked = docInfo.slots_booked?.[slotDate]?.includes(formattedTime)

        if (!isBooked) {
          daySlots.push({ dateTime: new Date(start), time: formattedTime })
        }

        start.setMinutes(start.getMinutes() + 15)
      }

      slots.push(daySlots)
    }

    setDocSlots(slots)
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {
      const selectedDate = docSlots[slotIndex]?.[0]?.dateTime
      if (!selectedDate || !slotTime) return toast.error('Please select a valid slot')

      const slotDate = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong while booking')
    }
  }

  useEffect(() => { fetchDocInfo() }, [doctors, docId])
  useEffect(() => { getAvailableSlots() }, [docInfo])

  return docInfo && (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto text-[#1F2937]">

      {/* Doctor Info */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full max-w-[300px] mx-auto lg:mx-0 bg-[#4f3da7] rounded-xl shadow">
          <img className="rounded-xl w-full object-cover" src={docInfo.image} alt={docInfo.name} />
        </div>

        <div className="flex-1 bg-white p-6 rounded-xl shadow border w-full">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </h2>

          <div className="flex items-center flex-wrap gap-2 text-sm text-gray-600 mt-1">
            <span>{docInfo.degree} - {docInfo.speciality}</span>
            <span className="px-2 py-0.5 border rounded text-xs bg-gray-100">{docInfo.experience}</span>
          </div>

          <div className="mt-4">
            <p className="flex items-center gap-1 font-medium text-gray-700 text-sm">
              About <img src={assets.info_icon} alt="Info" />
            </p>
            <p className="mt-1 text-sm text-gray-500">{docInfo.about}</p>
          </div>

          <p className="mt-4 font-medium text-gray-700">
            Appointment Fee: <span className="text-gray-900 font-semibold">{currencySymbol}{docInfo.fees}</span>
          </p>

          <button
            onClick={() => document.getElementById('slots')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-4 bg-[#4f3da7] hover:bg-[#2563EB] text-white px-4 py-2 rounded-sm cursor-pointer hover:rounded-lg text-sm transition-all"
          >
            Select a Slot
          </button>
        </div>
      </div>

      {/* Booking Slots */}
      <div id="slots" className="flex flex-col items-center justify-center mt-12 text-center">
        <h3 className="text-xl font-semibold text-gray-800 underline">Booking Slots</h3>
        <p className="text-md text-gray-600 mt-1">Pick a day</p>

        <div className="flex items-center justify-center gap-4 mt-6 pb-2 px-1 overflow-x-auto w-full scrollbar-hide">
          {docSlots.map((daySlots, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`min-w-16 md:min-w-20 px-4 py-5 rounded-xl cursor-pointer text-center transition
                ${slotIndex === index ? 'bg-[#4f3da7] text-white shadow' : 'bg-[#E8F9FF] text-black hover:brightness-110'}`}
            >
              <p className="font-semibold">{daySlots[0] && daysOfTheWeek[daySlots[0].dateTime.getDay()]}</p>
              <p className="text-sm">{daySlots[0] && daySlots[0].dateTime.getDate()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Time Slots */}
     <div className="mt-10 flex items-center justify-center gap-2 md:gap-4 px-2 flex-wrap">
  {docSlots[slotIndex]?.length > 0 ? (
    docSlots[slotIndex].map((slot, index) => (
      <p
        key={index}
        onClick={() => setSlotTime(slot.time)}
        className={`px-5 py-2 rounded-full cursor-pointer text-sm font-medium transition
          ${
            slot.time === slotTime
              ? 'bg-[#4f3da7] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
      >
        {slot.time.toLowerCase()}
      </p>
    ))
  ) : (
    <p className="text-gray-500 text-sm text-center w-full mt-4">
      No available slots for the selected day.
    </p>
  )}
</div>


      {/* Book Button */}
      <div className="flex justify-center mt-8 px-4">
        <button
          onClick={()=>{bookAppointment(),scrollTo(0, 0)}}
          className="bg-[#4f3da7] text-white px-10 py-3 rounded-full text-sm font-medium shadow hover:bg-[#2563EB] transition-all duration-300 cursor-pointer w-full sm:w-auto" 
        >
          Book an Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <div className="mt-12">
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  )
}

export default Appointment
