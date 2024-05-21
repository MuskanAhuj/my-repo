import React from "react";
import Layout from '../components/Layout';
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setUser } from "../redux/userSlice";
const TabPane = Tabs.TabPane;

const Notification = () => {

    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const markAllSeen = async () => {
        try{
            dispatch(showLoading());
            const response = await axios.post("http://localhost:4000/api/user/mark-all-notifications-seen", {userId: user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data))
            } else {
                toast.error(response.data.message);
		    }
        } catch (err) {
      	    toast.error("Something went wrong");
        }
    }
    const deleteAll = async () => {
        try{
            dispatch(showLoading());
            const response = await axios.post("http://localhost:4000/api/user/delete-all-notifications-seen", {userId: user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data))
            } else {
                toast.error(response.data.message);
		    }
        } catch (err) {
      	    toast.error("Something went wrong");
        }
    }
    return(
        <Layout>
            <h1 className="page-title">Notification</h1>
            <hr></hr>
            <Tabs>
                <TabPane key={'1'} tab='Unseen'>
                    <div className="d-flex justify-content-end">
                        <h1 className='anchor' onClick={() => markAllSeen()}>Mark all as read</h1> 
                    </div>
                    {user?.unseenNotifications.map((notification) => (
                        <div className="card p-2" onClick={()=> navigate(notification.onClickPath)}>
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </TabPane>
                <TabPane key={'2'} tab='Seen'>
                    <div className="d-flex justify-content-end">
                        <h1 className='anchor' onClick={() => deleteAll()}>Delete all</h1> 
                    </div>
                    {user?.seenNotifications.map((notification) => (
                        <div className="card p-2" onClick={()=> navigate(notification.onClickPath)}>
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </TabPane>
            </Tabs>
        </Layout>
    )
}

export default Notification;