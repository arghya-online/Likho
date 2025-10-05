import React, { useEffect} from 'react'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}){
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    // Will document this part later
    useEffect(() => {

        //let authValue = authStatus === true ? true : false

        if (authentication && authStatus != authentication) {
            navigate('/login')
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])


    return loader ? <h1>Loading...</h1> : <>{children}</>
}

