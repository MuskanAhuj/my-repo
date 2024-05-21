import { Button, Form } from "antd";
import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
  	const dispatch = useDispatch();
	const navigate = useNavigate();
  	const onFinish = async ({ confirmpass, ...values }) => {
    // console.log("Recieved Values !",values);
    try {
      if (values.password !== confirmpass) {
        toast.error("Password doesn't match");
        return;
      }
    dispatch(showLoading());
		const response = await axios.post("http://localhost:4000/api/user/register", values);
		dispatch(hideLoading());
		if (response.data.success) {
			toast.success(response.data.message);
			navigate("/login");
		} else {
			toast.error(response.data.message);
		}
    } catch (err) {
      	toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="register-left">
        {/* <div></div> */}
        <h1>Let us help you run your freelance business.</h1>
        <p>
          Our registration process is quick and easy,taking no more than 10
          minutes to complete
        </p>
        <div className="bg-img"></div>
      </div>
      <div className="register-right">
        <div className="authentication-form">
          <h1 className="register-heading">Get Started</h1>
          <p>Create your account now</p>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name">
              <Input
                placeholder="Name"
                type="text"
                autoComplete="off"
                required
              />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input
                placeholder="Email"
                type="email"
                autoComplete="off"
                required
              />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input
                placeholder="Password"
                type="password"
                autoComplete="off"
                required
              />
            </Form.Item>
            <Form.Item label="Confirm Password" name="confirmpass">
              <Input
                placeholder="Confirm Password"
                type="password"
                autoComplete="off"
                required
              />
            </Form.Item>
            <span>Already have an account?</span>
            <Link to="/login" className="link">
              Login Now
            </Link>
            {/* <button className="primary-button"  htmlType="submit">Sign Up</button> */}
            <Button className="primary-button" htmlType="submit">
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Register;
