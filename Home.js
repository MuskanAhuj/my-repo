import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Col, Row } from 'antd';
import { Freelancer } from '../components/Freelancer';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';

const Home = () => {
	const[freelancers,setFreelancer]=useState([]);
	const dispatch=useDispatch();

 	const getData = async () => {
 		try {
			dispatch(showLoading());
 			const response = await axios.get('http://localhost:4000/api/user/get-all-approved-freelancers', {
 				headers: {
 					Authorization: 'Bearer ' + localStorage.getItem('token')
 				}
 			})
			dispatch(hideLoading());
			if(response.data.success){
				setFreelancer(response.data.data); 
			}
 		} catch (error) {
			dispatch(hideLoading());
 			console.log(error)
 		}
 	}
 	useEffect(() => {
 		getData();
 	}, [])	
 	return ( 
		<Layout>
			<Row gutter={20}>
				{
					freelancers.map((freelancer)=>(
						<Col span={8} xs={24} sm={24} lg={8}>
							<Freelancer freelancer={freelancer}></Freelancer>
						</Col>
					))
				}
			</Row>
		</Layout>
 	)
}
export default Home; 