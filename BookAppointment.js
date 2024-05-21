import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import "../index.css";

export const BookAppointment = () => {
    const[isAvailable,setIsAvailable]=useState(false);
    const[date,setDate]=useState();
    const[time,setTime]=useState();
    const { user } = useSelector((state) => state.user);
    const params=useParams();
    const [freelancer, setFreelancer] = useState(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const getFreelancerData = async () => {
        try {
        dispatch(showLoading());
        const res = await axios.post(
            "http://localhost:4000/api/freelancer/get-freelancer-info-by-id",
            {
                freelancerId: params.freelancerId,
            },
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );
        dispatch(hideLoading());
        if (res.data.success) {
            dispatch(setFreelancer(res.data.data));
        }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
        }
    };

    const checkAvailability = async()=>{
        try {
            dispatch(showLoading());
            const res = await axios.post(
                "http://localhost:4000/api/user/check-booking-appointment",
                {
                    freelancerId: params.freelancerId, 
                    date:date,
                    time:time
                },
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                setIsAvailable(true);
                toast.success(res.data.message);
            }else{
                toast.error(res.data.message);
            }
        }catch (error) {
            toast.error("Error checking booking appointment")
            console.log(error);
            dispatch(hideLoading());
        }
    }

    const bookNow=async()=>{
        setIsAvailable(false);
        try {
            dispatch(showLoading());
            const res = await axios.post(
                "http://localhost:4000/api/user/book-appointment",
                {
                    freelancerId: params.freelancerId,
                    userId:user._id,
                    freelancerInfo: freelancer,
                    userInfo: user,
                    date:date,
                    time:time
                },
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                
                toast.success(res.data.message);
                navigate('/appointments');
            }
            } catch (error) {
                toast.error("Error booking appointment")
                console.log(error);
                dispatch(hideLoading());
            }
    }

    useEffect(() => {
        getFreelancerData();
    }, [user]);

  return (
    <Layout>
        <div className='page-title'>
            {freelancer && (
                <h1>
                    {freelancer.firstName}{freelancer.lastName}
                </h1>
            )}
            <hr></hr>
        
            <Row gutter={20} className="mt-5 row" align="middle">

                <Col span={8} sm={24} xs={24} lg={8}>
                    <img width="100%" height='400' src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"></img>
                </Col>

                <Col span={8} sm={24} xs={24} lg={8}>
                <div className="col">
                <h2 className="normal-text">Timings : {freelancer?.timings[0]}-{freelancer?.timings[1]}</h2>
                        
                        <p ><b>Phone Number : </b>{freelancer?.mobile}</p>
                        <p ><b>Profile : </b>{freelancer?.profile}</p>
                        <p ><b>Charge Per Hour : </b>{freelancer?.chargePerHour}</p>
                        <p ><b>Experience : </b>{freelancer?.experience}</p>
                        <p ><b>Skills : </b>{freelancer?.skills}</p>
                        <p ><b>Location : </b>{freelancer?.location}</p>

                <div className="d-flex flex-column pt-2 mt-2">
                    <DatePicker format='DD-MM-YYYY' onChange={(value)=>{
                        setIsAvailable(false);
                        setDate(value.format('DD-MM-YYYY'))
                    }} >
                    </DatePicker>
                    <TimePicker format='HH:mm' className="mt-3" onChange={(value)=>{
                        setIsAvailable(false);
                        setTime(value.format("HH:mm")
                    )}} />



                    {
                        !isAvailable && <Button type="primary" className="primary-button mt-2 full-width-button" onClick={checkAvailability}>
                        Check Availability
                    </Button>
                    }

                    {isAvailable && <Button type="primary" className="primary-button mt-2 full-width-button" onClick={bookNow}>
                        Book Now
                    </Button>}

                </div>
                </div>
                        
                </Col>
                
            </Row>

        </div>
    </Layout>
  )
}