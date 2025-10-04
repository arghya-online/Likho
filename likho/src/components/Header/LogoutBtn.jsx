import React from 'react'
import {logout} from "../../store/authSlice"

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        }).catch((error) => {
            console.error("Logout failed:", error)
        })
    }

    return (
        <button onClick={logoutHandler} className="bg-gradient-to-b from-red-500 to-red-700 text-white font-bold py-2 px-4 rounded-md border border-red-800 shadow-lg active:shadow-inner active:bg-red-700 transform transition-all duration-150">
            Logout
        </button>
    )
}

export default LogoutBtn
