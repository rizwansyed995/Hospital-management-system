import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [atoken, setatoken] = useState(localStorage.getItem('atoken'))
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL;


    const getAllAppointments = async (req, res) => {

        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-appointments', {}, { headers: { atoken } })
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);

            } else {
                toast.error(data.message)

            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { atoken } })

            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors);

            } else {
                toast.error(data.message)

            }
        } catch (error) {
            toast.error(error.message)

        }
    }
    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { atoken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }
    const value = {
        atoken, setatoken, backendUrl, doctors, getAllDoctors, changeAvailability, appointments, getAllAppointments
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}


export default AdminContextProvider;