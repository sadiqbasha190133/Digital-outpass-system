import React from "react";
import {useNavigate} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './Welcome.css'

const Welcome = () => {

    const navigate = useNavigate()

    const handleWardenClick = () => {
        navigate('/Warden')
    }

    const handleStudentClick =() => {
        navigate('/Student')
    }

    return(
        <>
            {/* <nav className="navbar-bg">

                <div className="brand-logo" onClick={() => navigate('/')}>
                    <img src={logo} alt="Logo" className="logo" />
                </div>

                <ul className="nav-links">
                    <li onClick={() => navigate('/')}>About</li>
                    <li onClick={() => navigate('/')}>Contact</li>
                    <li onClick={() => navigate('/')}>Services</li>
                </ul>

            </nav> */}
            <div className="home"> 
                <div className="bimage-2"></div>
                <div className="text">
                    <h1>WELCOME TO RK-VALLEY OUT PASS PORTAL</h1>
                    <h2>Who are you?</h2>
                    <div className="user">
                        <div className="who" onClick={handleWardenClick}>
                            <FontAwesomeIcon icon={faUser} size="3x" />
                            <p>WARDEN</p>
                        </div>
                        <div className="who" onClick={handleStudentClick}>
                            <FontAwesomeIcon icon={faUser}  size="3x" />
                            <p>STUDENT</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Welcome

