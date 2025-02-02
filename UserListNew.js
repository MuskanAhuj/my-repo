import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      dispatch(showLoading);
      const res = await axios.get('http://localhost:4000/api/admin/get-all-users', {
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(hideLoading);
      if(res.data.success){
        setUsers(res.data.data);
      }
    } catch (error) {
      dispatch(hideLoading);
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render:(record,text)=>moment(record.createdAt).format('DD-MM-YYYY'),
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          <h1 className='anchor'>Block</h1>
        </div>
      )
    }
  ]

  return (
    <Layout>
        <h1 className='page-header'>Users List</h1>
        <hr></hr>
        <Table columns={columns} dataSource={users} />
    </Layout>
  )
}
