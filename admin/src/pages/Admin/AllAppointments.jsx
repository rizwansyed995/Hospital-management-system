import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const AllAppointments = () => {
  const { appointments, getAllAppointments, atoken } = useContext(AdminContext)

  useEffect(() => {
    if (atoken) getAllAppointments()
  }, [atoken])

  return (
    <div className="m-6 md:px-8">
      <h1 className="text-2xl font-semibold text-[#5f6FFF] mb-6">All Booked Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white rounded-lg shadow-md p-5 border border-indigo-100"
            >
              <h2 className="text-lg font-bold text-neutral-800 mb-1">
                Patient: {appt.userData?.name || 'Unknown'}
              </h2>
              <p className="text-sm text-gray-700 mb-1">Doctor: {appt.docData?.name || 'Unknown'}</p>
              <p className="text-sm text-gray-700 mb-1">Speciality: {appt.docData?.speciality || '—'}</p>
              <p className="text-sm text-gray-700 mb-1">Date: {appt.slotDate}</p>
              <p className="text-sm text-gray-700 mb-1">Time: {appt.slotTime}</p>
              <p className="text-sm text-gray-700 mb-1">Amount: ₹{appt.amount}</p>

              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                <span className={`px-2 py-1 rounded-full ${appt.payment ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {appt.payment ? 'Paid' : 'Not Paid'}
                </span>
                <span className={`px-2 py-1 rounded-full ${appt.cancelled ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                  {appt.cancelled ? 'Cancelled' : 'Active'}
                </span>
                <span className={`px-2 py-1 rounded-full ${appt.isComplete ? 'bg-green-200 text-green-800' : 'bg-orange-100 text-orange-700'}`}>
                  {appt.isComplete ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllAppointments
