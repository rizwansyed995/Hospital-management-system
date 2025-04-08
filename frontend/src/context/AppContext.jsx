import { createContext } from "react";
import { doctors } from "../assets/assets";
export const  AppContext = createContext();

const AppContextProvider = (props)=>{
    const currencySymbol='₹'
    const primary="#5f6FFF"
    const value ={
        doctors,currencySymbol,primary
    }
    return (
        <AppContext.Provider value={value} > 
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider ;