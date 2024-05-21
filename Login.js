import {Button, Form } from "antd";
import {Input} from "antd";
import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";


function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const onFinish = async(values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("http://localhost:4000/api/user/login", values);
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem("token",response.data.data)
                navigate('/')
            }else {
                toast.error(response.data.message);
            }
        }catch (err) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
        }
    }

    return <div className="authentication">
        <div className="register-left">
            <h1>Let us help you run your freelance business.</h1>
            <p>Our registration process is quick and easy,taking no more than 10 minutes to complete</p>
            <div className="bg-img"></div>
        </div>
        <div className="register-right">
            <div className="authentication-form">
                <h1 className="register-heading">Welcome Back!</h1>
                <p>Login your account now</p>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="email" >
                        <Input placeholder="Email" type="email" required/>
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input placeholder="Password" type="password" required/>
                    </Form.Item>
                    <span>Don't have an account?</span><Link to='/register' className="link">Register Now</Link>
                    <Button  className="primary-button" htmlType="submit">Login</Button>
                </Form>
            </div>
        </div>
    </div>
}
export default Login;