import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../../components/FreelancerForm";
import moment from 'moment';

const Profile = () => {
    const [freelancer, setFreelancer] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        // console.log(values, user._id);
        // console.log(values.timings);
        try {
        dispatch(showLoading());
        const response = await axios.post(
            "http://localhost:4000/api/freelancer/update-freelancer-profile",
            {
                ...values,
                userId: user._id,
                timings: [
                    values.timings[0].format("HH:mm"),
                    values.timings[1].format("HH:mm")
                ]
            },
            {   
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );
        dispatch(hideLoading());
        if (response.data.success) {
            toast.success(response.data.message);
            navigate("/");
        } else {
            toast.error(response.data.message);
        }
        } catch (err) {
        dispatch(hideLoading());
        toast.error("Something went wrong");
        console.log(err);
        }
    };

    const getFreelancerData = async () => {
        try {
        dispatch(showLoading());
        const res = await axios.post(
            "http://localhost:4000/api/freelancer/get-freelancer-info-by-user-id",
            {
                userId: user?._id
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
            // localStorage.clear();
            // navigate("/login");
        }
    };
    useEffect(() => {
        getFreelancerData();
    }, [user]);

    return (
        <Layout>
        <h1 className="page-title">Freelancer's Profile</h1>
        <hr></hr>
        {freelancer && <DoctorForm onFinish={onFinish} values={freelancer}/>}
        </Layout>
    );
};

export default Profile;