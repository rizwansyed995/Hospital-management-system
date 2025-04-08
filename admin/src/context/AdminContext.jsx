import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const AdminContext = createContext()

const AdminContextProvider = (props)=>{
    const [atoken, setatoken]= useState(localStorage.getItem('atoken'))
    const [doctors,setDoctors]= useState([])
    const backendUrl= "http://localhost:4000"
   
    

    const getAllDoctors= async()=>{
        try {
            const {data}= await axios.post(backendUrl + '/api/admin/all-doctors',{}, {headers:{atoken}})

            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors);
                
            }else{
                toast.error(data.message)
                console.log("Niavvaaa");
                
            }
        } catch (error) {
            toast.error(error.message)

        }
    }
    const changeAvailability= async(docId)=>{
        try {
            const {data} = await axios.post(backendUrl+ '/api/admin/change-availability',{docId}, {headers:{atoken}})
            if(data.success){
                toast.success(data.message) 
                getAllDoctors()
            }
        } catch (error) {
            toast.error(data.message)
        }
    }
    const value = {
        atoken,setatoken, backendUrl,doctors,getAllDoctors
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}


export default AdminContextProvider;