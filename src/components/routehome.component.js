import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"

import {useSelector,useDispatch} from 'react-redux'
import {getAllBooks, validateLogin} from '../reduxStore/main.slice'

import Cart from './cart.component'
import Order from './order.component'
import NavBar from './navbar.component'
import ViewBook from './viewbook.component'
import Home from './home.component'
import Login from './login.component'
import Register from './register.component'


function RouteHome() {
    const loading=useSelector(state=>state.main.loading)
    const dispatch=useDispatch()
    useEffect(()=>{
        // loading var does change...but it's too fast
        // for the UI to register
        
    // comment below line after login implementation!
        // dispatch(validateLogin({username:"jahnavi",password:"randompass"}))

        console.log("haha loading var changed!!")
    },[loading])
    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={ <Home/> } />
                <Route path="/cart" element={ <Cart/> } />
                <Route path="/order" element={ <Order/> } />
                <Route path="/viewbook" element={<ViewBook/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </div>
    )
}

export default RouteHome