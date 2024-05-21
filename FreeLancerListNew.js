import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { Table } from 'antd';
import { toast } from "react-hot-toast";
import moment from 'moment';

function FreeLancerList(){

  const [freelancers, setFreelancers] = useState([]);
  const dispatch = useDispatch();
  const getFreelancerData = async () => {
    try {
      dispatch(showLoading);
      const res = await axios.get('http://localhost:4000/api/admin/get-all-freelancers', {
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(hideLoading);
      if(res.data.success){
        setFreelancers(res.data.data);
      }
    } catch (error) {
      dispatch(hideLoading);
      console.log(error);
    }
  }
  console.log(freelancers);
  const changeFreelancerStatus = async (record, status) => {
    try {
      dispatch(showLoading);
      const res = await axios.post('http://localhost:4000/api/admin/change-freelancer-status', {freelancerId: record._id, userId: record.userId, status: status}, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(hideLoading);
      if(res.data.success){
        toast.success(res.data.message);
        getFreelancerData();
      }
    } catch (error) {
      toast.error('Error changing doctor status');
      dispatch(hideLoading);
      console.log(error);
    }
  }

  useEffect(() => {
    getFreelancerData();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <h1 className='normal-text'>{record.firstName} {record.lastName}</h1>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'mobile',
    },
    {
      title: 'Linkedin Profile',
      dataIndex: 'profile'
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render:(record,text)=>moment(record.createdAt).format('DD-MM-YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          {record.status === 'pending' && <h1 className='anchor' onClick={()=> changeFreelancerStatus(record, 'approved')}>Approve</h1>}
          {record.status === 'approved' && <h1 className='anchor' onClick={()=> changeFreelancerStatus(record, 'blocked')}>Block</h1>}
        </div>
      )
    }
  ]

  return (
    <Layout>
        <h1 className='page-header'>Freelancer List</h1>
        <hr></hr>
        <Table columns={columns} dataSource={freelancers} />
    </Layout>
  )
}

export default FreeLancerList;