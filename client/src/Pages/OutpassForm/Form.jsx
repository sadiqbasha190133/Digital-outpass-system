
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import "./Form.css";
import StudentNavbar from "../../Components/Navbar/StudentNavbar";
import { createOutpass } from "../../actions/outpass";

const Form = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const User = JSON.parse(localStorage.getItem('Profile'));

    const [room, setRoom] = useState(0);
    const [duration, setDuration] = useState(0);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [purpose, setPurpose] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const generateUniqueId = () => uuidv4();

    const handleApply = (e) => {
        e.preventDefault();
        const outpassId = generateUniqueId();
        dispatch(createOutpass({
            name: User.result.name,
            enrollment: User.result.enrollment,
            room,
            duration,
            fromDate,
            toDate,
            hostel: User.result.hostel,
            purpose,
            address,
            outpassId,
            email: User.result.email
        }, navigate));
    };

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const from = new Date(fromDate);
        const to = new Date(toDate);

        if (fromDate && from < today) {
            setError("From Date cannot be in the past.");
        } else if (fromDate && toDate && to < from) {
            setError("To Date cannot be before From Date.");
        } else {
            setError('');
        }
    }, [fromDate, toDate]);

    const todayStr = new Date().toISOString().split('T')[0];

    return (
        <div className="form">
            <div className="bimage"></div>
            <div className="nav-bar"><StudentNavbar /></div>
            <div className="form-box">
                <input type="text" name="email" value={User.result.email} className="inp email" required disabled />
                <form className="outpass-form" onSubmit={handleApply}>
                    <p className="form-text">Fill out this form to apply for outpass:</p>

                    <input type="text" name="fname" value={User.result.name} className="inp fname" required disabled />
                    <input type="text" name="enroll" value={User.result.enrollment} className="inp enr" required disabled />
                    <input type="number" name="room" placeholder="Room Number" className="inp room" onChange={(e) => setRoom(e.target.value)} required />
                    <input type="number" name="days" placeholder="Duration" className="inp days" onChange={(e) => setDuration(e.target.value)} required />
                    
                    <label htmlFor="from" className="from">From:
                        <input
                            type="date"
                            id="from"
                            name="from"
                            className="inp date"
                            min={todayStr}
                            onChange={(e) => setFromDate(e.target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="to" className="to">To:
                        <input
                            type="date"
                            id="to"
                            name="to"
                            className="inp date"
                            min={fromDate || todayStr}
                            onChange={(e) => setToDate(e.target.value)}
                            required
                        />
                    </label>

                    {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

                    <input type="text" name="hostel" value={User.result.hostel} className="inp hostel-no" disabled />
                    <input type="text" name="purpose" placeholder="Purpose of Leave" className="inp purpose" onChange={(e) => setPurpose(e.target.value)} required />
                    <input type="text" name="address" placeholder="Address on Leave" className="inp address" onChange={(e) => setAddress(e.target.value)} required />
                    
                    <input type="submit" value="Apply" name="apply" className="sub-btn" disabled={!!error} />
                </form>
            </div>
        </div>
    );
};

export default Form;
