import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FreelancerForm from "../components/FreelancerForm";
import moment from "moment";

function ApplyFreelancer() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("http://localhost:4000/api/user/apply-freelancer-account", {
        ...values,
        userId: user._id,
        timings: [
          values.timings[0].format("HH:mm"),
          values.timings[1].format("HH:mm")
      ]
      }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
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

  return (
    <Layout>
      <h1 className="page-title">Apply Freelancer</h1>
      <hr />
      <FreelancerForm onFinish={onFinish}/>
    </Layout>
  );
}

export default ApplyFreelancer;
