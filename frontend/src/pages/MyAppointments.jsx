import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const slotDateFormat = (slotDate) => {
    // If slotDate is like "2023-05-12_...", take only the date part
    return slotDate.split('_')[0]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }
  const markPaymentDone = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/mark-payment',
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success('Payment successful!')
        getUserAppointments()  // Refresh the list
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">
      <h2 className="text-2xl font-semibold text-zinc-800 mb-6 border-b border-gray-300 pb-3">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No appointments booked yet.</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex-shrink-0 w-32 h-32 rounded-md overflow-hidden bg-indigo-50">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 text-zinc-700 text-sm sm:text-base">
                <p className="font-semibold text-neutral-900 text-lg">{item.docData.name}</p>
                <p className="italic text-indigo-600">{item.docData.speciality}</p>

                <div className="mt-2">
                  <p className="font-medium text-zinc-800">Address:</p>
                  <p className="text-xs sm:text-sm">{item.docData.address.line1}</p>
                  <p className="text-xs sm:text-sm">{item.docData.address.line2}</p>
                </div>

                <p className="mt-3 text-neutral-800 font-medium">
                  Date & Time:{' '}
                  <span className="font-normal">
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-4 sm:mt-0 sm:justify-center">
                {item.payment ? (
                  <button className="px-4 py-2 border border-gray-400 text-gray-600 rounded cursor-not-allowed">
                    Payment Done
                  </button>
                ) : (
                  <button
                    onClick={() => markPaymentDone(item._id)}
                    className="px-4 py-2 border border-indigo-500 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition"
                  >
                    Pay Online
                  </button>
                )}

                <button className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-600 hover:text-white transition">
                  Cancel Appointment
                </button>
                <button className="px-4 py-2 border border-green-600 text-green-700 rounded hover:bg-green-600 hover:text-white transition">
                  Take Prediagnosis
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments
